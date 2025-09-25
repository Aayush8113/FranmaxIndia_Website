import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../../utils/api';

// Arrow Icons
const ChevronRight = () => <span style={{ marginLeft: "auto", fontWeight: 600 }}>›</span>;
const ChevronLeft = () => <span style={{ fontWeight: 600 }}>‹</span>;

export default function StateCityDrawer({ onStateSelect, onCitySelect }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [activePanel, setActivePanel] = useState('state');
  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [stateVisibleCount, setStateVisibleCount] = useState(6);
  const [cityVisibleCount, setCityVisibleCount] = useState(6);

  useEffect(() => {
    fetch(getApiUrl('get-indian-states.php'))
      .then(res => res.json())
      .then(data => Array.isArray(data) && setStates(data));
  }, []);

  const handleStateClick = (state) => {
    setSelectedState(state);
    setActivePanel('city');
    setCitySearch('');
    setCityVisibleCount(6);
    if (!cities[state.id]) {
      fetch(getApiUrl(`get-cities.php?state_id=${state.id}`))
        .then(res => res.json())
        .then(data => setCities(prev => ({ ...prev, [state.id]: data })));
    }
    if (onStateSelect) onStateSelect(state.id);
    const url = new URL(window.location);
    url.searchParams.set('state_id', state.id);
    url.searchParams.delete('city_id');
    window.history.replaceState({}, '', url);
  };

  const handleCityClick = (city) => {
    if (onCitySelect && selectedState) {
      onCitySelect({ stateId: selectedState.id, cityId: city.id });
    }
    const url = new URL(window.location);
    url.searchParams.set('state_id', selectedState.id);
    url.searchParams.set('city_id', city.id);
    window.history.replaceState({}, '', url);
  };

  const goBack = () => {
    setActivePanel('state');
    setSelectedState(null);
    setCitySearch('');
    setCityVisibleCount(6);
  };

  const filteredStates = states.filter(s => s.name.toLowerCase().includes(stateSearch.toLowerCase())).slice(0, stateVisibleCount);
  const filteredCities = (cities[selectedState?.id] || []).filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase())).slice(0, cityVisibleCount);

  const styles = {
    container: { display: "flex", flexDirection: "column", gap: "15px" },
    panel: { maxHeight: 0, overflow: "hidden", transition: "all 0.35s ease", padding: 0 },
    panelActive: { maxHeight: "1000px", padding: "15px", background: "#fff", borderRadius: "10px", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" },
    header: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "12px" },
    backButton: { cursor: "pointer", background: "#004e92", border: "none", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontWeight: 600 },
    title: { fontSize: "20px", fontWeight: 700, background: "linear-gradient(90deg,#004e92,#d71920)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 },
    searchInput: { width: "100%", padding: "10px 14px", marginBottom: "14px", borderRadius: "10px", border: "1px solid #ccc", outline: "none", fontSize: "15px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)", transition: "all 0.3s ease" },
    list: { listStyle: "none", padding: 0, margin: 0 },
    listItem: { padding: "12px 15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 500, color: "#060644", borderBottom: "1px solid #eee", borderRadius: "6px", transition: "all 0.2s ease" },
    listItemHover: { backgroundColor: "#f0f8ff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
    loadMoreWrapper: { textAlign: "center", marginTop: "12px" },
    loadMoreBtn: { padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#004e92", color: "#fff", cursor: "pointer", fontWeight: 600, transition: "all 0.3s ease" }
  };

  const renderItem = (item, onClick) => (
    <li
      key={item.id}
      style={styles.listItem}
      onClick={onClick}
      onMouseEnter={e => Object.assign(e.currentTarget.style, styles.listItemHover)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, styles.listItem)}
    >
      <span style={{ marginRight: "10px", color: "#d71920" }}>●</span>
      {item.name}
      <ChevronRight />
    </li>
  );

  return (
    <div style={styles.container}>
      {/* STATE PANEL */}
      <div style={{ ...styles.panel, ...(activePanel === 'state' ? styles.panelActive : {}) }}>
        <h4 style={styles.title}>Select State</h4>
        <input style={styles.searchInput} placeholder="Search states..." value={stateSearch} onChange={e => { setStateSearch(e.target.value); setStateVisibleCount(6); }} />
        <ul style={styles.list}>{filteredStates.map(state => renderItem(state, () => handleStateClick(state)))}</ul>
        {stateVisibleCount < states.length && (
          <div style={styles.loadMoreWrapper}>
            <button style={styles.loadMoreBtn} onClick={() => setStateVisibleCount(prev => prev + 6)}>Load More</button>
          </div>
        )}
      </div>

      {/* CITY PANEL */}
      <div style={{ ...styles.panel, ...(activePanel === 'city' ? styles.panelActive : {}) }}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={goBack}><ChevronLeft /> Back</button>
          <h4 style={styles.title}>{selectedState?.name}</h4>
        </div>
        <input style={styles.searchInput} placeholder="Search cities..." value={citySearch} onChange={e => { setCitySearch(e.target.value); setCityVisibleCount(6); }} />
        <ul style={styles.list}>{filteredCities.map(city => renderItem(city, () => handleCityClick(city)))}</ul>
        {cityVisibleCount < (cities[selectedState?.id] || []).length && (
          <div style={styles.loadMoreWrapper}>
            <button style={styles.loadMoreBtn} onClick={() => setCityVisibleCount(prev => prev + 6)}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}
