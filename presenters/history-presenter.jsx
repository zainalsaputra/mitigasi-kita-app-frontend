import { fetchHistoryList, deleteHistoryItem } from "../src/utils/auth";
import MySwal from "sweetalert2";

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
    const result = await MySwal.fire({
      title: "Yakin ingin menghapus data history?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      background: "#0D3553",
      color: "white",
      confirmButtonColor: "#C43238",
      cancelButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteHistoryItem(id, token);
          setHistoryList((prevList) => prevList.filter((item) => item.id !== id));
        } catch (error) {
          MySwal.showValidationMessage(`Gagal hapus: ${error.message}`);
          throw error;
        }
      },
      allowOutsideClick: () => !MySwal.isLoading(),
    });

    if (result.isConfirmed) {
      await MySwal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Data history berhasil dihapus.",
        background: "#0D3553",
        color: "white",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.error("Gagal menghapus history:", error.message);
  }
}
