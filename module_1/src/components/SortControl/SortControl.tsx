import React from 'react';
import styles from './SortControl.module.css'

export type SortByOption = 'RELEASE DATE' | 'TITLE';

interface SortControlProps {
  value: SortByOption;
  onSortChange: (newValue: SortByOption) => void;
}

const SortControl: React.FC<SortControlProps> = ({ value, onSortChange }) => {

  return (
    <div className={styles.sortControl}>
      <label className={styles.label}>
        SORT BY
        <select
          data-testid="sort-select"
          value={value}
          className={styles.select}
          onChange={(e) => onSortChange(e.target.value as SortByOption)}

        >
          <option className={styles.option} value="RELEASE DATE">RELEASE DATE</option>
          <option className={styles.option} value="TITLE">TITLE</option>
        </select>
      </label>
    </div>
  )
};

export default SortControl;
