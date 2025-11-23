import { fetchTreatments } from '@/sanity/lib/queries';

export default async function KezelesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const treatments = await fetchTreatments();

  const treatmentsQueryResult = await treatments.data;

  console.log('TREATMENTS_QUERYResult', treatmentsQueryResult);

  return <div>Kezelés oldal: {slug}</div>;
}
