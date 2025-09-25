import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/api";

// You can also replace these with react-icons if you want more icons
const ChevronRight = () => (
  <span style={{ marginLeft: "auto", fontWeight: 600 }}>›</span>
);
const ChevronLeft = () => (
  <span style={{ fontWeight: 600 }}>‹</span>
);

export default function CategoryDrawer() {
  const navigate = useNavigate();

  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState({});

  const [activePanel, setActivePanel] = useState("master");
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [subSearch, setSubSearch] = useState("");
  const [visibleMasters, setVisibleMasters] = useState(4);
  const [visibleCategories, setVisibleCategories] = useState(4);
  const [visibleSubcategories, setVisibleSubcategories] = useState(4);

  useEffect(() => {
    fetch(getApiUrl("get-master-category.php"))
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setMasterCategories(data))
      .catch((err) => console.error("Master Category API error:", err));
  }, []);

  const saveSelection = ({ masterId, categoryId, subcategoryId }) => {
    localStorage.setItem(
      "categorySelection",
      JSON.stringify({ masterId, categoryId, subcategoryId })
    );
  };

  const handleMasterClick = (master) => {
    setSelectedMaster(master);
    setActivePanel("category");
    setCategorySearch("");
    setVisibleCategories(4);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    saveSelection({ masterId: master.mas_cat_id });
    navigate(`/category?mas_cat=${master.mas_cat_id}`);
    if (!categories[master.mas_cat_id] || categories[master.mas_cat_id].length === 0) {
      fetch(getApiUrl(`get-category.php?mas_cat_id=${master.mas_cat_id}`))
        .then((res) => res.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : data.data || [];
          setCategories((prev) => ({ ...prev, [master.mas_cat_id]: list }));
        })
        .catch((err) => console.error("Category API error:", err));
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setActivePanel("subcategory");
    setSubSearch("");
    setVisibleSubcategories(4);
    setSelectedSubcategory(null);
    saveSelection({ masterId: selectedMaster?.mas_cat_id, categoryId: cat.cat_id });
    navigate(`/category?mas_cat=${selectedMaster?.mas_cat_id}&cat=${cat.cat_id}`);
    if (!subcategories[cat.cat_id] || subcategories[cat.cat_id].length === 0) {
      fetch(getApiUrl(`get-sub-category.php?cat_id=${cat.cat_id}`))
        .then((res) => res.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : data.data || [];
          setSubcategories((prev) => ({ ...prev, [cat.cat_id]: list }));
        })
        .catch((err) => console.error("Subcategory API error:", err));
    }
  };

  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(sub);
    saveSelection({
      masterId: selectedMaster?.mas_cat_id,
      categoryId: selectedCategory?.cat_id,
      subcategoryId: sub.subcat_id,
    });
    navigate(
      `/category?mas_cat=${selectedMaster?.mas_cat_id}&cat=${selectedCategory?.cat_id}&sub=${sub.subcat_id}`
    );
  };

  const goBack = () => {
    if (activePanel === "subcategory") setActivePanel("category");
    else if (activePanel === "category") setActivePanel("master");
  };

  // Filtered & displayed lists
  const filteredMasters = masterCategories.filter((cat) =>
    cat.mas_cat_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, visibleMasters);

  const categoryList = categories[selectedMaster?.mas_cat_id] || [];
  const filteredCategories = categoryList.filter((cat) =>
    cat.cat_name.toLowerCase().includes(categorySearch.toLowerCase())
  ).slice(0, visibleCategories);

  const subcategoryList = subcategories[selectedCategory?.cat_id] || [];
  const filteredSubcategories = subcategoryList.filter((sub) =>
    sub.subcat_name.toLowerCase().includes(subSearch.toLowerCase())
  ).slice(0, visibleSubcategories);

  const styles = {
    drawerContainer: { width: "100%", display: "flex", flexDirection: "column", gap: "15px" },
    drawerPanel: { maxHeight: 0, overflow: "hidden", transition: "all 0.35s ease", padding: 0 },
    drawerPanelActive: { maxHeight: "1000px", padding: "15px", background: "#fff", borderRadius: "12px", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" },
    header: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "12px" },
    backButton: { cursor: "pointer", background: "#004e92", border: "none", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontWeight: 600, transition: "background 0.3s ease" },
    backButtonHover: { background: "#002e5b" },
    title: { margin: 0, fontSize: "20px", fontWeight: 700, background: "linear-gradient(90deg, #004e92, #d71920)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    searchInput: { width: "100%", padding: "10px 14px", marginBottom: "14px", borderRadius: "10px", border: "1px solid #ccc", outline: "none", fontSize: "15px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)", transition: "all 0.3s ease" },
    list: { listStyle: "none", padding: 0, margin: 0 },
    listItem: { padding: "12px 15px", cursor: "pointer", fontWeight: 500, color: "#060644", borderBottom: "1px solid #eee", borderRadius: "6px", display: "flex", alignItems: "center", transition: "all 0.2s ease", boxShadow: "0 0 0 rgba(0,0,0,0)" },
    listItemHover: { backgroundColor: "#f0f8ff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
    loadMoreWrapper: { textAlign: "center", marginTop: "12px" },
    loadMoreBtn: { padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#004e92", color: "#fff", cursor: "pointer", fontWeight: 600, transition: "all 0.3s ease" },
    loadMoreBtnHover: { backgroundColor: "#002e5b" },
  };

  const renderListItem = (item, onClick) => (
    <li
      key={item.id || item.mas_cat_id || item.cat_id || item.subcat_id}
      style={styles.listItem}
      onClick={onClick}
      onMouseEnter={e => Object.assign(e.currentTarget.style, styles.listItemHover)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, styles.listItem)}
    >
      {/* Optional icon */}
      <span style={{ marginRight: "10px", color: "#d71920" }}>●</span>
      {item.mas_cat_name || item.cat_name || item.subcat_name}
      <ChevronRight />
    </li>
  );

  return (
    <div style={styles.drawerContainer}>
      {/* MASTER PANEL */}
      <div style={{ ...styles.drawerPanel, ...(activePanel === "master" ? styles.drawerPanelActive : {}) }}>
        <h4 style={styles.title}>Explore Categories</h4>
        <input style={styles.searchInput} placeholder="Search master categories..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setVisibleMasters(4); }} />
        <ul style={styles.list}>
          {filteredMasters.map(master => renderListItem(master, () => handleMasterClick(master)))}
        </ul>
        {visibleMasters < masterCategories.length && (
          <div style={styles.loadMoreWrapper}>
            <button style={styles.loadMoreBtn} onClick={() => setVisibleMasters(masterCategories.length)}>Load More</button>
          </div>
        )}
      </div>

      {/* CATEGORY PANEL */}
      <div style={{ ...styles.drawerPanel, ...(activePanel === "category" ? styles.drawerPanelActive : {}) }}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={goBack}><ChevronLeft /> Back</button>
          <h4 style={styles.title}>{selectedMaster?.mas_cat_name}</h4>
        </div>
        <input style={styles.searchInput} placeholder="Search categories..." value={categorySearch} onChange={(e) => { setCategorySearch(e.target.value); setVisibleCategories(4); }} />
        <ul style={styles.list}>
          {filteredCategories.map(cat => renderListItem(cat, () => handleCategoryClick(cat)))}
        </ul>
      </div>

      {/* SUBCATEGORY PANEL */}
      <div style={{ ...styles.drawerPanel, ...(activePanel === "subcategory" ? styles.drawerPanelActive : {}) }}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={goBack}><ChevronLeft /> Back</button>
          <h4 style={styles.title}>{selectedCategory?.cat_name}</h4>
        </div>
        <input style={styles.searchInput} placeholder="Search subcategories..." value={subSearch} onChange={(e) => { setSubSearch(e.target.value); setVisibleSubcategories(4); }} />
        <ul style={styles.list}>
          {filteredSubcategories.map(sub => renderListItem(sub, () => handleSubcategoryClick(sub)))}
        </ul>
      </div>
    </div>
  );
}
