export function Card({ children }) {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-md p-3">
      {children}
    </div>
  );
};