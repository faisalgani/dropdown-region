export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="max-w-3xl mb-10">
      <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        {title}
      </h3>
    </div>
  );
}