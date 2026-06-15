import type { ProjectedCallout } from "../../lib/projection";

export type ScreenPoint = {
  x: number;
  y: number;
};

export type ConnectorPath = {
  d: string;
  id: string;
  isActive: boolean;
  lineEnd: ScreenPoint;
  projection: ProjectedCallout;
};

type DesktopLeaderLinesProps = {
  connectorPaths: ConnectorPath[];
  hasActiveCallout: boolean;
};

export function DesktopLeaderLines({
  connectorPaths,
  hasActiveCallout,
}: DesktopLeaderLinesProps) {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <filter
          id="callout-line-glow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="callout-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(78, 231, 255, 0.72)" />
        </marker>
        <marker
          id="callout-arrow-active"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(180, 246, 255, 0.96)" />
        </marker>
      </defs>
      {connectorPaths.map((connector) => (
        <g
          key={connector.id}
          opacity={hasActiveCallout && !connector.isActive ? 0.48 : 1}
          filter={connector.isActive ? "url(#callout-line-glow)" : undefined}
        >
          <path
            d={connector.d}
            fill="none"
            markerEnd={
              connector.isActive
                ? "url(#callout-arrow-active)"
                : "url(#callout-arrow)"
            }
            stroke={
              connector.isActive
                ? "rgba(150, 242, 255, 0.72)"
                : "rgba(78, 231, 255, 0.28)"
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={connector.isActive ? 1.45 : 0.9}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={connector.lineEnd.x}
            cy={connector.lineEnd.y}
            r={connector.isActive ? 2.8 : 2}
            fill={
              connector.isActive
                ? "rgba(180, 246, 255, 0.78)"
                : "rgba(78, 231, 255, 0.38)"
            }
          />
          <circle
            cx={connector.projection.x}
            cy={connector.projection.y}
            r={connector.isActive ? 4.5 : 3.2}
            fill="rgba(78, 231, 255, 0.72)"
          />
        </g>
      ))}
    </svg>
  );
}
