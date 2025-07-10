import React, { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddAccountModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
    const [form, setForm] = useState({ username: "", password: "", game_name: "", tag: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:8000/accounts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            onSuccess();
            onClose();
        } else {
            const err = await res.json();
            alert(err.detail || "アカウント追加に失敗しました");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                pointerEvents: "auto"
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "24px",
                    borderRadius: "16px",
                    width: "400px",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.3)"
                }}
            >
                <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
                    アカウント追加
                </h2>
                <input
                    type="text"
                    name="username"
                    placeholder="ユーザー名"
                    value={form.username}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={form.password}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />
                <input
                    type="text"
                    name="game_name"
                    placeholder="ゲーム名"
                    value={form.game_name}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />
                <input
                    type="text"
                    name="tag"
                    placeholder="タグ（任意）"
                    value={form.tag}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <button onClick={onClose} style={{ padding: "6px 12px" }}>キャンセル</button>
                    <button onClick={handleSubmit} style={{ padding: "6px 12px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "4px" }}>追加</button>
                </div>
            </div>
        </div>
    );
};

export default AddAccountModal;
