const fs = require('fs');
const readline = require('readline');
const dbFile = 'database.json';

if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, '[]');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loadDatabase() {
    const data = fs.readFileSync(dbFile);
    return JSON.parse(data);
}

function saveDatabase(data) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

function showAllItems() {
    const items = loadDatabase();
    console.log("Daftar Item:");
    items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - ${item.genre} - ${item.year}`);
    });
    mainMenu();
}

function addItem() {
    rl.question('Masukkan nama item: ', (name) => {
        rl.question('Masukkan genre: ', (genre) => {
            rl.question('Masukkan tahun: ', (year) => {
                const items = loadDatabase();
                items.push({ name, genre, year });
                saveDatabase(items);
                console.log('Item berhasil ditambahkan!');
                mainMenu();
            });
        });
    });
}

function showItemDetail() {
    rl.question('Masukkan nomor item: ', (index) => {
        const items = loadDatabase();
        const item = items[parseInt(index) - 1];
        if (item) {
            console.log(`Detail Item:\nNama: ${item.name}\nGenre: ${item.genre}\nTahun: ${item.year}`);
        } else {
            console.log('Item tidak ditemukan!');
        }
        mainMenu();
    });
}

function updateItem() {
    rl.question('Masukkan nomor item yang ingin diupdate: ', (index) => {
        const items = loadDatabase();
        if (!items[parseInt(index) - 1]) {
            console.log('Item tidak ditemukan!');
            return mainMenu();
        }
        rl.question('Masukkan nama baru: ', (name) => {
            rl.question('Masukkan genre baru: ', (genre) => {
                rl.question('Masukkan tahun baru: ', (year) => {
                    items[parseInt(index) - 1] = { name, genre, year };
                    saveDatabase(items);
                    console.log('Item berhasil diperbarui!');
                    mainMenu();
                });
            });
        });
    });
}

function deleteItem() {
    rl.question('Masukkan nomor item yang ingin dihapus: ', (index) => {
        const items = loadDatabase();
        if (!items[parseInt(index) - 1]) {
            console.log('Item tidak ditemukan!');
            return mainMenu();
        }
        items.splice(parseInt(index) - 1, 1);
        saveDatabase(items);
        console.log('Item berhasil dihapus!');
        mainMenu();
    });
}

function mainMenu() {
    console.log('\nPilih aksi:');
    console.log('1. Lihat daftar item');
    console.log('2. Tambah item');
    console.log('3. Lihat detail item');
    console.log('4. Update item');
    console.log('5. Hapus item');
    console.log('6. Keluar');

    rl.question('Masukkan nomor: ', (choice) => {
        switch (choice) {
            case '1': showAllItems(); break;
            case '2': addItem(); break;
            case '3': showItemDetail(); break;
            case '4': updateItem(); break;
            case '5': deleteItem(); break;
            case '6': rl.close(); break;
            default: console.log('Pilihan tidak valid!'); mainMenu();
        }
    });
}

console.log("Halo, selamat datang di sistem database sederhana!");
mainMenu();
