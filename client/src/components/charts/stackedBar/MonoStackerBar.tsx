import React from "react";
import styles from "./monoStackedBarStyle.module.css";

import Grow from "@mui/material/Grow";

interface BarData {
  value: number;
  color: string;
  caption?: string;
}

interface MonoStackedBarProps {
  data: (number | BarData)[];
  colors?: string[];
  displayLabels?: boolean;
  labelColor?: string;
  unit?: string;
  width?: number;
  height?: number;
  radius?: number;
}

const isNumber = (data: number | BarData): boolean => {
  return typeof data === "number";
};

const getSectionValue = (section: number | BarData): number => {
  return isNumber(section) ? (section as number) : (section as BarData).value;
};

const getSectionColor = (section: number | BarData): string | undefined => {
  return isNumber(section) ? undefined : (section as BarData).color;
};

function isBarDataValues<BarData>(arr: (number | BarData)[]): arr is BarData[] {
  if (!Array.isArray(arr)) {
    return false;
  }
  if (!arr.every((elt: number | BarData) => typeof elt !== "number")) {
    return false;
  }
  return true;
}

const toPx = (size: number | undefined): string | undefined => {
  if (!size) return "0";
  return `${size}px`;
};

const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const sumSectionArray = (sectionArray: (number | BarData)[]): number => {
  if (sectionArray.length === 0) return 0;
  return sectionArray
    .map((section) => getSectionValue(section))
    .reduce((a, b) => a + b);
};

export const MonoStackerBar = ({
  data,
  colors = [],
  displayLabels = true,
  labelColor = "white",
  unit = "",
  width,
  height = 20,
  radius = 10,
}: MonoStackedBarProps): JSX.Element => {
  const sumValues = data.length
    ? data.map((section) => getSectionValue(section)).reduce((a, b) => a + b)
    : 1;

  return (
    <div
      style={{
        maxWidth: width,
      }}
    >
      <div className={styles.stackedBar}>
        {data.length &&
          data.map((section, index) => {
            const radiusPx = toPx(radius);
            const proportion = (getSectionValue(section) * 100) / sumValues;
            return (
              <Grow
                key={`bar-animation-${index}`}
                in={true}
                style={{ transformOrigin: "left" /*"0 0 0"*/ }}
                {...(index > 0 ? { timeout: 1000 } : { timeout: 200 })}
              >
                <div
                  style={{
                    width: `${proportion}%`,
                    height: height,
                    borderRadius:
                      data.length === 1 || proportion === 100
                        ? radiusPx
                        : index === 0 ||
                          sumSectionArray(data.slice(0, index)) === 0
                        ? `${radiusPx} 0 0 ${radiusPx}`
                        : index === data.length - 1 ||
                          sumSectionArray(data.slice(index + 1)) === 0
                        ? `0 ${radiusPx} ${radiusPx} 0`
                        : "0",
                    backgroundColor:
                      getSectionColor(section) || colors[index] || "#393986",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className={styles.section}
                >
                  {displayLabels && proportion > 5 && (
                    <span
                      style={{
                        fontSize: height - height / 2,
                        color: labelColor,
                        fontWeight: "bold",
                        //borderLeft: "1px solid white",
                      }}
                      className={styles.sectionLabel}
                    >
                      {`${
                        /*Math.round(*/ getSectionValue(section) /*)*/
                      }${unit}`}
                    </span>
                  )}
                </div>
              </Grow>
            );
          })}
      </div>
      <div className={styles.caption}>
        {isBarDataValues(data) &&
          data.filter((section) => section.caption).length > 0 &&
          data.map((section, index) => {
            if (!section.caption)
              return <React.Fragment key={`caption-animation-${index}`} />;
            const proportion = (getSectionValue(section) * 100) / sumValues;
            // if (proportion < 10)
            //   return <React.Fragment key={`caption-animation-${index}`} />;
            return (
              <Grow
                key={`caption-animation-${index}`}
                in={true}
                style={{ transformOrigin: "left" /*"0 0 0"*/ }}
                {...(index > 0 ? { timeout: 1000 } : { timeout: 200 })}
              >
                <div
                  key={`caption-${index}`}
                  style={{
                    width: `${proportion}%`,
                    fontSize: height - height / 2,
                    fontWeight: "bold",
                    paddingTop: "4px",
                  }}
                >
                  {capitalize(section.caption)}
                </div>
              </Grow>
            );
          })}
      </div>
    </div>
  );
};
