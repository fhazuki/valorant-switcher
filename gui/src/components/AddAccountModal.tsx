import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


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
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
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
                        zIndex: 9999
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            background: "#fff",
                            padding: "28px",
                            borderRadius: "16px",
                            width: "400px",
                            boxShadow: "0 12px 24px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
                            アカウント追加
                        </h2>

                        {["username", "password", "game_name", "tag"].map((field, idx) => (
                            <input
                                key={field}
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                placeholder={
                                    field === "username"
                                        ? "ユーザー名"
                                        : field === "password"
                                            ? "パスワード"
                                            : field === "game_name"
                                                ? "ゲーム名"
                                                : "タグ（任意）"
                                }
                                value={(form as never)[field]}
                                onChange={handleChange}
                                style={{
                                    width: "90%",
                                    padding: "12px 14px",
                                    marginBottom: idx === 3 ? "24px" : "16px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    fontSize: "14px"
                                }}
                            />
                        ))}

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#eee",
                                    borderRadius: "6px",
                                    border: "none",
                                    fontSize: "14px"
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#2563eb",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontSize: "14px"
                                }}
                            >
                                追加
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

};

export default AddAccountModal;
