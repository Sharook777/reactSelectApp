import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Select.css";

var propTypeCheck = {
  object(item, index) {
    return { ...item, selected: false, id: index + 1 };
  },

  string(item, index) {
    return { title: item, selected: false, id: index + 1 };
  },
};

function setNewArrayOptions(arr, fns) {
  return arr.map((item, index) => {
    return fns[typeof item](item, index);
  });
}

export default function Select({
  options,
  searchable,
  multiselect,
  title,
  output,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const [selectOptions, setSelectOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const formatedOptions = setNewArrayOptions(options, propTypeCheck);
    setSelectOptions(formatedOptions);
    setFilteredOptions(formatedOptions);
  }, []);

  useEffect(() => {
    const availableOptions = searchKey
      ? selectOptions.filter((option) => option.title.includes(searchKey))
      : selectOptions;
    setFilteredOptions(availableOptions);
  }, [searchKey, selectOptions]);

  useEffect(() => {
    if (output) {
      output(
        selectOptions
          .filter((e) => e.selected)
          .map((e) => e.title)
          .join(",")
      );
    }
  }, [selectOptions, setSelectOptions]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionSelect = (option, id) => () => {
    const options = selectOptions.map((option) => {
      if (option.id === id) return { ...option, selected: !option.selected };
      return { ...option, selected: multiselect ? option.selected : false };
    });

    setSelectOptions(options);

    if (!multiselect) {
      setIsOpen(false);
    }
  };

  const onSearchChange = (event) => {
    setSearchKey(event.target.value);
  };

  const onSelectAll = () => {
    const options = selectOptions.map((option) => {
      return { ...option, selected: true };
    });

    setSelectOptions(options);
  };

  const onClear = () => {
    const options = selectOptions.map((option) => {
      return { ...option, selected: false };
    });

    setSelectOptions(options);
  };

  const onSubmit = () => {
    const options = selectOptions.filter((option) => option.selected);
    if (multiselect)
      console.log(options.map((option) => ({ title: option.title })));

    setIsOpen(false);
  };

  const selectedAll = () => {
    const options = selectOptions.filter((option) => option.selected);

    if (options.length === selectOptions.length) return "Selected_CheckBox";
    if (options.length) return "Selected_Some";
    return "";
  };

  return (
    <>
      <div className="Select_Wrapper">
        {/* onMouseLeave={() => setIsOpen(false)} */}
        <div className="Select_Header">
          {searchable ? (
            <input
              type="text"
              className="Select_Search_Input"
              onClick={toggling}
              placeholder={title || "Search"}
              onChange={onSearchChange}
            />
          ) : (
            <button className="Select_Button" onClick={toggling}>
              <div className="Select_Button_Text">{title}</div>
            </button>
          )}
        </div>
        {isOpen && filteredOptions.length ? (
          <div className="Select_Option_Wrapper">
            {multiselect && (
              <button className="Select_Option" onClick={onSelectAll}>
                <div className={`Multiselect_Checkbox ${selectedAll()}`}></div>
              </button>
            )}
            <div className="Select_List">
              {filteredOptions.map((option, index) => (
                <button
                  key={option.title}
                  className={`Select_Option ${
                    option.selected ? "Selected_Option" : ""
                  }`}
                  onClick={onOptionSelect(option, option.id)}
                >
                  {multiselect && (
                    <div
                      className={`Multiselect_Checkbox ${
                        option.selected ? "Selected_CheckBox" : ""
                      }`}
                    ></div>
                  )}
                  {option.title}
                </button>
              ))}
            </div>
            {multiselect && (
              <div className="MultiSelect_Button_wrapper">
                <button
                  className="Multiselect_Action_Button Multiselect_Clear"
                  onClick={onClear}
                >
                  Clear
                </button>
                <button
                  className="Multiselect_Action_Button Multiselect_Submit"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

Select.defaultProps = {
  searchable: true,
  multiselect: false,
  options: [],
};

Select.propTypes = {
  searchable: PropTypes.bool,
  multiselect: PropTypes.bool,
  title: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
    ),
  ]).isRequired,
  output: PropTypes.func,
};
