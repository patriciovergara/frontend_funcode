function PlaceholderPage({ title, description }) {
  return (
    <section>
      <h1 className="mb-3">{title}</h1>
      <p className="text-secondary">{description}</p>
    </section>
  );
}

export default PlaceholderPage;