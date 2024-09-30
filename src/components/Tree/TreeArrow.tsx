import React from 'react';
import XArrow from 'react-xarrows';

interface TreeArrowProps {
    startId: string;
    endId: string;
    label?: string;
}

const TreeArrow = ({ startId, endId, label }: TreeArrowProps) => (
    <XArrow
        end={endId}
        start={startId}
        endAnchor={{
            position: 'bottom',
            offset: {
                x: -240,
            },
        }}
        startAnchor="left"
        color="#000"
        strokeWidth={1}
        labels={label ? { start: <span className="arrow-label">{label}</span> } : undefined}
    />
);

export default React.memo(TreeArrow);
