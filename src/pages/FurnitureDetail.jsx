import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFurnitureById, clearSelectedItem } from "../features/furniture/furnitureSlice";

const FurnitureDetail = ({ id, onBack }) => {
    const dispatch = useDispatch();
    const { selectedItem, status, error } = useSelector(state => state.furniture);
    const theme = useSelector(state => state.ui.theme);

    useEffect(() => {
        if (id) {
            dispatch(fetchFurnitureById(id));
        }
        return () => {
            dispatch(clearSelectedItem());
        };
    }, [id, dispatch]);

    if (status === "loading") return <p>Загрузка деталей...</p>;
    if (status === "failed") return <p>Ошибка: {error}</p>;
    if (!selectedItem) return null;

    return (
        <article style={{
            padding: "20px",
            background: theme === "light" ? "#fff" : "#333",
            color: theme === "light" ? "#000" : "#fff",
            border: "2px solid #007bff",
            borderRadius: "10px",
            margin: "20px"
        }}>
            <button onClick={onBack} style={{ marginBottom: "15px", padding: "5px 15px", cursor: "pointer" }}>
                Назад к списку
            </button>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <img
                    src={`/src/it_spashel/img_mebel/${selectedItem.image}`}
                    alt={selectedItem.name}
                    style={{ maxWidth: "400px", borderRadius: "8px" }}
                />
                <div style={{ flex: 1 }}>
                    <h2>{selectedItem.name}</h2>
                    <p><strong>Тип:</strong> {selectedItem.type}</p>
                    <p><strong>Описание:</strong> {selectedItem.description}</p>
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#007bff" }}>{selectedItem.price} сом</p>
                </div>
            </div>
        </article>
    );
};

export default FurnitureDetail;
