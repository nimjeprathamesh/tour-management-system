export default function Error(message) {
  return (
    <section id='error' style={{ justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <main style={{ justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <h2 style={{textAlign: 'center'}}>An error occurred!</h2>
        <p className="errMsg">{message}</p>
      </main>
    </section>
  );
}
