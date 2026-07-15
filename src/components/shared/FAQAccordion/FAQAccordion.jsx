import { useState } from 'react';

export default function FAQAccordion({ items, classes, singleOpen = false, defaultOpenIndex = null }) {
  const [openIndexes, setOpenIndexes] = useState(defaultOpenIndex === null ? [] : [defaultOpenIndex]);

  const toggle = (index) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index);
      if (singleOpen) {
        return isOpen ? [] : [index];
      }
      return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
    });
  };

  return (
    <div className={classes.faqGrid}>
      {items.map((item, i) => {
        const active = openIndexes.includes(i);
        return (
          <div key={i} className={`${classes.faqItem} ${active ? classes.active || '' : ''}`}>
            <button type="button" className={classes.faqQuestion} onClick={() => toggle(i)}>
              <span>{item.q}</span>
              <span className={classes.faqToggle}>+</span>
            </button>
            <div className={classes.faqAnswer}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
