import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home";
import FurnitureList from "./pages/FurnitureList";
import FurnitureDetail from "./pages/FurnitureDetail";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <Header />
      <Home />
      {selectedId ? (
        <FurnitureDetail id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        <FurnitureList onSelect={(id) => setSelectedId(id)} />
      )}
      <Footer />
    </>
  )
}

export default App;