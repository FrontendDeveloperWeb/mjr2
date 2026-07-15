import { useState } from 'react';
import { Tabs as AntTabs } from 'antd';

/**
 * Isolated, reusable tab system.
 *
 * Each instance owns its own state by default, so multiple Tabs on the same
 * page never cross-contaminate each other (fixes the shared-state bug where
 * flipping one article card's tab flipped every other card).
 *
 * - Uncontrolled (default): pass `items` (+ optional `defaultActiveKey`). The
 *   component tracks the active tab internally via local `useState`.
 * - Controlled (opt-in): pass an explicit `activeKey` + `onChange` bound to a
 *   unique piece of state when a parent genuinely needs to drive one instance.
 *
 * All other props (className, tabBarExtraContent, etc.) forward to antd Tabs,
 * so markup stays identical to a direct <Tabs> usage.
 */
export default function Tabs({ items, defaultActiveKey, activeKey, onChange, ...rest }) {
  const isControlled = activeKey !== undefined;
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? items?.[0]?.key);

  const currentKey = isControlled ? activeKey : internalKey;

  const handleChange = (key) => {
    if (!isControlled) setInternalKey(key);
    onChange?.(key);
  };

  return <AntTabs {...rest} items={items} activeKey={currentKey} onChange={handleChange} />;
}
