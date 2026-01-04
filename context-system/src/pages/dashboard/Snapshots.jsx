export default function Snapshots() {
  const snapshots = [
    { id: 1, title: "React Learning Progress", date: "2024-01-15" },
    { id: 2, title: "API Integration Task", date: "2024-01-14" },
    { id: 3, title: "Database Design", date: "2024-01-13" }
  ];

  return (
    <div className="card">
      <h3>📸 Context Snapshots</h3>
      <p>Your saved learning snapshots</p>
      
      {snapshots.map((snapshot) => (
        <div key={snapshot.id} className="task-item">
          <strong>{snapshot.title}</strong>
          <div className="muted">{snapshot.date}</div>
        </div>
      ))}
    </div>
  );
}