import initSqlJs from "sql.js";

const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: file => `https://sql.js.org/dist/${file}`
});

let db = null;

async function initDatabase() {
  try {
    const SQL = await initSqlJs({
      locateFile: file =>
        `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${file}`
    });

    const db = new SQL.Database();

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name    TEXT    NOT NULL,
        customer_email   TEXT    NOT NULL,
        customer_phone   TEXT    NOT NULL,
        phone_brand      TEXT    NOT NULL,
        phone_model      TEXT    NOT NULL,
        repair_type      TEXT,
        technician       TEXT,
        drop_off_date    TEXT    NOT NULL,
        issue_description TEXT,
        base_price       REAL,
        total_price      REAL,
        created_at       TEXT    NOT NULL
      );
    `);
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

function saveBookingToDatabase(booking) {
  if (!db) {
    console.error("Database not initialized.");
    return;
  }

  try {
    db.run(
      `INSERT INTO bookings (customer_name, customer_email, customer_phone, phone_brand, phone_model, repair_type, technician, drop_off_date, issue_description, base_price, total_price, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        booking.customerName,
        booking.customerEmail,
        booking.customerPhone,
        booking.phoneBrand,
        booking.phoneModel,
        booking.repairType,
        booking.technician,
        booking.dropOffDate,
        booking.issueDescription,
        booking.basePrice,
        booking.totalPrice,
        new Date().toISOString()
      ]
    );
  } catch (error) {
    console.error("Failed to save booking to database:", error);
  }
}

function deleteBookingsFromDatabase() {
  if (!db) {
    console.error("Database not initialized.");
    return;
  }
  try{
    db.run(`DELETE FROM bookings`);
  } catch (error) {
    console.error("Failed to delete bookings from database:", error);
  }
}

function showAllBookings() {
  if (!db) {
    console.error("Database not initialized.");
    return;
  }
  try {
    const res = db.exec(`SELECT * FROM bookings`);
    console.log(res);
  } catch (error) {
    console.error("Failed to retrieve bookings from database:", error);
  }
}
