import React from 'react';
import XArrow from 'react-xarrows';

interface TreeArrowProps {
    startId: string;
    endId: string;
}

const TreeArrow = ({ startId, endId }: TreeArrowProps) => (
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
    />
);

export default React.memo(TreeArrow);
