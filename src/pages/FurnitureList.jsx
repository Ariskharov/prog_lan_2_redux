import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFurniture } from "../features/furniture/furnitureSlice";

const FurnitureList = ({ onSelect }) => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector(state => state.furniture);
    const theme = useSelector(state => state.ui.theme);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchFurniture());
        }
    }, [status, dispatch]);

    if (status === "loading") return <p>Загрузка каталога мебели...</p>;
    if (status === "failed") return <p>Ошибка: {error}</p>;

    return (
        <section style={{
            padding: "20px",
            background: theme === "light" ? "#fff" : "#333",
            color: theme === "light" ? "#000" : "#fff"
        }}>
            <h2>Каталог мебели</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                {items.map(item => (
                    <div key={item.id} style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        borderRadius: "8px",
                        background: theme === "light" ? "#f9f9f9" : "#444",
                        textAlign: "center"
                    }}>
                        <img
                            src={`/src/it_spashel/img_mebel/${item.image}`}
                            alt={item.name}
                            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }}
                        />
                        <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
                        <p style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "10px 0" }}>{item.price} сом</p>
                        <button
                            onClick={() => onSelect(item.id)}
                            style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                background: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                width: "100%"
                            }}
                        >
                            Подробнее
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FurnitureList;
