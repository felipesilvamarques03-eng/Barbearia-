import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Painel", robots: { index: false } };

const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeZone: "America/Sao_Paulo" });

export default function AdminPage() {
  return (
    <Container className="py-16">
      <Suspense fallback={<p className="text-muted">Carregando…</p>}>
        <Contacts />
      </Suspense>
    </Container>
  );
}

/**
 * Painel do dono: usa a função do banco que devolve SOMENTE nome, e-mail, status e data.
 * Quem não é administrador recebe 404 (não revelamos que a página existe).
 */
async function Contacts() {
  const { supabase } = await requireUser();
  const { data, error } = await supabase.rpc("admin_listar_contatos");
  if (error) notFound();

  const rows = (data ?? []) as { nome: string; email: string; status: string; inscrito_em: string }[];
  const ativos = rows.filter((r) => r.status === "ativa").length;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-4xl font-semibold">Alunos</h1>
        <p className="text-muted">
          {rows.length} cadastrados · {ativos} com assinatura ativa. Por privacidade, este painel mostra só contato e status.
        </p>
      </header>
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th scope="col" className="p-4 font-medium">Nome</th>
              <th scope="col" className="p-4 font-medium">E-mail</th>
              <th scope="col" className="p-4 font-medium">Assinatura</th>
              <th scope="col" className="p-4 font-medium">Cadastro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.email}>
                <td className="p-4">{r.nome}</td>
                <td className="p-4">
                  <a href={`mailto:${r.email}`} className="text-accent hover:underline">
                    {r.email}
                  </a>
                </td>
                <td className="p-4 capitalize">{r.status}</td>
                <td className="p-4 text-muted">{dateFmt.format(new Date(r.inscrito_em))}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted">
                  Nenhum aluno cadastrado ainda.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
