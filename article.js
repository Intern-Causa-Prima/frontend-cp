// 1. Ambil semua artikel dan konfigurasi
const articles = document.querySelectorAll('.article');
const itemsPerPage = 9; // Jumlah artikel per halaman
let currentPage = 1; // Halaman awal
const totalPages = Math.ceil(articles.length / itemsPerPage);

// 2. Ambil semua item <li> pada pagination (termasuk Previous dan Next)
const paginationItems = document.querySelectorAll('.pagination .page-item');

// 3. Fungsi untuk menampilkan artikel sesuai halaman
function showPage(page) {
    articles.forEach((article, index) => {
        if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });

    // Perbarui status tombol Previous dan Next
    document.getElementById('previous').parentElement.classList.toggle('disabled', page === 1);
    document.getElementById('next').parentElement.classList.toggle('disabled', page === totalPages);

    // Perbarui indikator halaman aktif
    updateActivePage(page);
}

// 4. Fungsi untuk memperbarui indikator halaman aktif
function updateActivePage(page) {
    paginationItems.forEach((item) => {
        item.classList.remove('active'); // Hapus semua 'active'
    });

    if (page > 0 && page <= totalPages) {
        paginationItems[page].classList.add('active'); // Tambahkan 'active' pada halaman saat ini
    }
}

// 5. Fungsi untuk pindah ke halaman tertentu
function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        showPage(currentPage);
    }
}

// 6. Tampilkan halaman pertama saat awal dimuat
showPage(currentPage);

// 7. Event Listener untuk tombol Previous
document.getElementById('previous').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
        goToPage(currentPage - 1); // Pindah ke halaman sebelumnya
    }
});

// 8. Event Listener untuk tombol Next
document.getElementById('next').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
        goToPage(currentPage + 1); // Pindah ke halaman berikutnya
    }
});

// 9. Event Listener untuk setiap item pagination
paginationItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(index + 1); // Pindah ke halaman yang dipilih
    });
});