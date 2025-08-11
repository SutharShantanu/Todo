import TodoPage from "./todo-page";

export default function Home() {

  return (
    <div className="flex justify-center items-center w-full max-w-7xl min-h-[calc(100vh-60px)] m-auto px-2 pt-[90px] pb-4">
      <TodoPage />
    </div>
  );
}