function Header() {
  return (
    <header
      style={{
        backgroundColor: "#121c2bff",
        color: "white",
        padding: "10px 35px",
        textAlign: "left",
        marginBottom: "20px",
        letterSpacing: "2px",
      }}
    >
      <h2>Inventory Tracker</h2>
      <p style={{marginBottom: "0", fontSize: "13px" }}>Track products and stock movements</p>

    </header>
  );
}

export default Header;