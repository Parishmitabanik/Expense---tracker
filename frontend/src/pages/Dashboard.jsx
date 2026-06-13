import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        amount: "",
        category: ""
    });

    const token = localStorage.getItem("token");
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const handleEdit = (expense) => {
        setEditingId(expense.id);

        setEditData({
            title: expense.title,
            amount: expense.amount,
            category: expense.category
        });
    };
    const handleUpdate = async (expenseId) => {
        try {
            await api.put(
                `/expenses/${expenseId}`,
                {
                    ...editData,
                    amount: Number(editData.amount)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEditingId(null);

            fetchExpenses();

        } catch (err) {
            console.log(err);
            alert("Failed to update expense");
        }
    };
    // Fetch expenses
    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExpenses(response.data);

        } catch (err) {
            console.log(err);
            alert("Failed to fetch expenses");
        }
    };

    // Fetch expenses when dashboard loads
    useEffect(() => {
        fetchExpenses();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Add expense
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                "/expenses",
                {
                    ...form,
                    amount: Number(form.amount)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Clear form
            setForm({
                title: "",
                amount: "",
                category: ""
            });

            // Refresh expense list
            fetchExpenses();

        } catch (err) {
            console.log(err);
            alert("Failed to add expense");
        }
    };

    // Delete expense
    const handleDelete = async (expenseId) => {
        try {
            await api.delete(
                `/expenses/${expenseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Refresh expense list
            fetchExpenses();

        } catch (err) {
            console.log(err);
            alert("Failed to delete expense");
        }
    };

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1>Expense Dashboard</h1>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit">
                    Add Expense
                </button>
            </form>

            <hr />

            <h2>Your Expenses</h2>

            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {editingId === expense.id ? (
                                <>
                                    <input
                                        value={editData.title}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                title: e.target.value
                                            })
                                        }
                                    />

                                    <input
                                        value={editData.amount}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                amount: e.target.value
                                            })
                                        }
                                    />

                                    <input
                                        value={editData.category}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                category: e.target.value
                                            })
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            handleUpdate(expense.id)
                                        }
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() =>
                                            setEditingId(null)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    {expense.title}
                                    {" - "}
                                    ₹{expense.amount}
                                    {" - "}
                                    {expense.category}

                                    <button
                                        onClick={() =>
                                            handleEdit(expense)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(expense.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;