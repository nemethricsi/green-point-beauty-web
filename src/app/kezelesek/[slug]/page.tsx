export default async function KezelesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <div>Kezelés oldal: {slug}</div>;
}
