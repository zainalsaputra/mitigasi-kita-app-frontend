import { fetchHistoryList, deleteHistoryItem } from "../src/utils/auth";

export async function loadHistoryListPresenter(setHistoryList) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Token tidak ditemukan");
    return;
  }

  try {
    const data = await fetchHistoryList(token);
    setHistoryList(data);
  } catch (error) {
    console.error("Gagal memuat history:", error.message);
  }
}

export async function deleteHistoryPresenter(id, setHistoryList) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Token tidak ditemukan");
    return;
  }

  try {
    await deleteHistoryItem(id, token);
    setHistoryList((prevList) => prevList.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Gagal menghapus history:", error.message);
  }
}