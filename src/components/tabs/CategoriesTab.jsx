// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
// import { getApiUrl } from '../../utils/api';
// export default function CategoriesTab() {
//   const [masterCategories, setMasterCategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [selectedMasterCat, setSelectedMasterCat] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   // Fetch Master Categories
//   useEffect(() => {
//     fetch(getApiUrl('get-master-category.php'))
//       .then(res => res.json())
//       .then(data => {
//         const formatted = data.map(item => ({
//           value: item.mas_cat_id,
//           label: item.mas_cat_name
//         }));
//         setMasterCategories(formatted);
//       })
//       .catch(err => console.error("Error loading master categories:", err));
//   }, []);

//   // Fetch Categories when Master Category changes
//   useEffect(() => {
//     if (selectedMasterCat?.value) {
//       fetch(getApiUrl(`get-category.php?mas_cat_id=${selectedMasterCat.value}`))
//         .then(res => res.json())
//         .then(data => {
//           const formatted = data.map(item => ({
//             value: item.cat_id,
//             label: item.cat_name
//           }));
//           setCategories(formatted);
//         })
//         .catch(err => console.error("Error loading categories:", err));
//     } else {
//       setCategories([]);
//       setSubCategories([]);
//     }
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//   }, [selectedMasterCat]);

//   // Fetch Subcategories when Category changes
//   useEffect(() => {
//     if (selectedCategory?.value) {
//       fetch(getApiUrl(`get-sub-category.php?cat_id=${selectedCategory.value}`))
//         .then(res => res.json())
//         .then(data => {
//           const formatted = data.map(item => ({
//             value: item.subcat_id,
//             label: item.subcat_name
//           }));
//           setSubCategories(formatted);
//         })
//         .catch(err => console.error("Error loading subcategories:", err));
//     } else {
//       setSubCategories([]);
//     }
//     setSelectedSubCategory(null);
//   }, [selectedCategory]);

//   return (
//     <div className="filter-row">
//       {/* Master Category */}
//       <div style={{ minWidth: 200 }}>
//         <Select
//           placeholder="Select Master Category"
//           value={selectedMasterCat}
//           onChange={setSelectedMasterCat}
//           options={masterCategories}
//           isClearable
//         />
//       </div>

//       {/* Category */}
//       <div style={{ minWidth: 200 }}>
//         <Select
//           placeholder="Select Category"
//           value={selectedCategory}
//           onChange={setSelectedCategory}
//           options={categories}
//           isDisabled={!categories.length}
//           isClearable
//         />
//       </div>

//       {/* Subcategory */}
//       <div style={{ minWidth: 200 }}>
//         <Select
//           placeholder="Select Sub Category"
//           value={selectedSubCategory}
//           onChange={setSelectedSubCategory}
//           options={subCategories}
//           isDisabled={!subCategories.length}
//           isClearable
//         />
//       </div>

//       <button className="search-btn">🔍</button>
//     </div>
//   );
// }













import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getApiUrl } from '../../utils/api';

// Number Formatter (Indian style with Lac/Cr)
function formatIndianNumber(num) {
  if (!num && num !== 0) return '';

  const n = Number(num);

  if (n >= 10000000) {
    return (n / 10000000).toFixed(2).replace(/\.0+$/, '') + ' Cr';
  } else if (n >= 100000) {
    return (n / 100000).toFixed(2).replace(/\.0+$/, '') + ' Lac';
  } else {
    return n.toLocaleString('en-IN');
  }
}

export default function CategoriesTab() {
  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedMasterCat, setSelectedMasterCat] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Fetch Master Categories
  useEffect(() => {
    fetch(getApiUrl('get-master-category.php'))
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          value: item.mas_cat_id,
          // if API has numeric value (say item.count), format it
          label: item.count
            ? `${item.mas_cat_name} (${formatIndianNumber(item.count)})`
            : item.mas_cat_name
        }));
        setMasterCategories(formatted);
      })
      .catch(err => console.error("Error loading master categories:", err));
  }, []);

  // Fetch Categories when Master Category changes
  useEffect(() => {
    if (selectedMasterCat?.value) {
      fetch(getApiUrl(`get-category.php?mas_cat_id=${selectedMasterCat.value}`))
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(item => ({
            value: item.cat_id,
            label: item.count
              ? `${item.cat_name} (${formatIndianNumber(item.count)})`
              : item.cat_name
          }));
          setCategories(formatted);
        })
        .catch(err => console.error("Error loading categories:", err));
    } else {
      setCategories([]);
      setSubCategories([]);
    }
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  }, [selectedMasterCat]);

  // Fetch Subcategories when Category changes
  useEffect(() => {
    if (selectedCategory?.value) {
      fetch(getApiUrl(`get-sub-category.php?cat_id=${selectedCategory.value}`))
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(item => ({
            value: item.subcat_id,
            label: item.count
              ? `${item.subcat_name} (${formatIndianNumber(item.count)})`
              : item.subcat_name
          }));
          setSubCategories(formatted);
        })
        .catch(err => console.error("Error loading subcategories:", err));
    } else {
      setSubCategories([]);
    }
    setSelectedSubCategory(null);
  }, [selectedCategory]);

  return (
    <div className="filter-row">
      {/* Master Category */}
      <div style={{ minWidth: 200 }}>
        <Select
          placeholder="Select Master Category"
          value={selectedMasterCat}
          onChange={setSelectedMasterCat}
          options={masterCategories}
          isClearable
        />
      </div>

      {/* Category */}
      <div style={{ minWidth: 200 }}>
        <Select
          placeholder="Select Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
          isDisabled={!categories.length}
          isClearable
        />
      </div>

      {/* Subcategory */}
      <div style={{ minWidth: 200 }}>
        <Select
          placeholder="Select Sub Category"
          value={selectedSubCategory}
          onChange={setSelectedSubCategory}
          options={subCategories}
          isDisabled={!subCategories.length}
          isClearable
        />
      </div>

      <button className="search-btn">🔍</button>
    </div>
  );
}
