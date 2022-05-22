import React, { useState, useEffect } from "react";
// import Select from "react-select";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { withTheme } from "@emotion/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(s, skillName, theme) {
  return {
    fontWeight:
      skillName.indexOf(s) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SkillsForm() {
  const theme = useTheme();
  let [skills, setSkills] = useState([]);
  let [skillName, setSkillName] = useState([]);
  console.log("this selected", skillName);

  //   let options = skills.map((skill) => {
  //     return {
  //       label: skill.skill_name,
  //       value: skill.id,
  //     };
  //   });

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = () => {
    fetch("/skills")
      .then((response) => response.json())
      .then((skills) => {
        setSkills(skills);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillName(typeof value === "string" ? value.split(",") : value);
  };

  const handleDelete = (chipToDelete) => () => {
    setSkillName((chips) => chips.filter((chip) => chip.key !== chipToDelete));
  };

  return (
    <div className="container">
      {/* <h2 className="title">Edit your skills</h2>
      <div>
        <Select
          isMulti
          name="skills"
          options={options}
          value={selected}
          onChange={setSelected}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div> */}
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={skillName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip color="success" key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {skills.map((s) => (
              <MenuItem
                key={s.id}
                value={s.skill_name}
                style={getStyles(s, skillName, theme)}
              >
                {s.skill_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
