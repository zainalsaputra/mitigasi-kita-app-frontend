import { fetchHistoryDetail, deleteHistoryItem } from "../src/utils/auth";

export async function loadHistoryDetailPresenter(id, setHistory) {
  const token = localStorage.getItem("accessToken");
  if (!token) return console.error("Token tidak ditemukan");

  try {
    const data = await fetchHistoryDetail(id, token);
    setHistory(data);
  } catch (error) {
    console.error("Gagal memuat detail history:", error.message);
  }
}

export async function deleteHistoryAndRedirectPresenter(id, navigate) {
  const token = localStorage.getItem("accessToken");
  if (!token) return console.error("Token tidak ditemukan");

  try {
    await deleteHistoryItem(id, token);
    navigate("/history");
  } catch (error) {
    console.error("Gagal menghapus history:", error.message);
  }
}
