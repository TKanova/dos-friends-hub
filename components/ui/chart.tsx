"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { useTheme } from "next-themes" // Import useTheme from next-themes

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: { color: COLORS } }
const COLORS = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(222.2 84% 4.9%)",
    card: "hsl(0 0% 100%)",
    "card-foreground": "hsl(222.2 84% 4.9%)",
    popover: "hsl(0 0% 100%)",
    "popover-foreground": "hsl(222.2 84% 4.9%)",
    primary: "hsl(222.2 47.4% 11.2%)",
    "primary-foreground": "hsl(210 40% 98%)",
    secondary: "hsl(210 40% 96.1%)",
    "secondary-foreground": "hsl(222.2 47.4% 11.2%)",
    muted: "hsl(210 40% 96.1%)",
    "muted-foreground": "hsl(215.4 16.3% 46.9%)",
    accent: "hsl(210 40% 96.1%)",
    "accent-foreground": "hsl(222.2 47.4% 11.2%)",
    destructive: "hsl(0 84.2% 60.2%)",
    "destructive-foreground": "hsl(210 40% 98%)",
    border: "hsl(214.3 31.8% 91.4%)",
    input: "hsl(214.3 31.8% 91.4%)",
    ring: "hsl(222.2 84% 4.9%)",
    "chart-1": "hsl(197 37% 24%)",
    "chart-2": "hsl(200 69% 11%)",
    "chart-3": "hsl(179 74% 28%)",
    "chart-4": "hsl(204 47% 32%)",
    "chart-5": "hsl(200 69% 11%)",
  },
  dark: {
    background: "hsl(222.2 84% 4.9%)",
    foreground: "hsl(210 40% 98%)",
    card: "hsl(222.2 84% 4.9%)",
    "card-foreground": "hsl(210 40% 98%)",
    popover: "hsl(222.2 84% 4.9%)",
    "popover-foreground": "hsl(210 40% 98%)",
    primary: "hsl(210 40% 98%)",
    "primary-foreground": "hsl(222.2 47.4% 11.2%)",
    secondary: "hsl(217.2 32.6% 17.5%)",
    "secondary-foreground": "hsl(210 40% 98%)",
    muted: "hsl(217.2 32.6% 17.5%)",
    "muted-foreground": "hsl(215 20.2% 65.1%)",
    accent: "hsl(217.2 32.6% 17.5%)",
    "accent-foreground": "hsl(210 40% 98%)",
    destructive: "hsl(0 62.8% 30.6%)",
    "destructive-foreground": "hsl(210 40% 98%)",
    border: "hsl(217.2 32.6% 17.5%)",
    input: "hsl(217.2 32.6% 17.5%)",
    ring: "hsl(210 40% 98%)",
    "chart-1": "hsl(197 37% 24%)",
    "chart-2": "hsl(200 69% 11%)",
    "chart-3": "hsl(179 74% 28%)",
    "chart-4": "hsl(204 47% 32%)",
    "chart-5": "hsl(200 69% 11%)",
  },
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

type ChartConfig = {
  [k: string]: {
    label?: string
    icon?: React.ComponentType
    color?: string
  }
}

type ChartContainerProps = {
  config: ChartConfig
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<"div">

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    const id = React.useId()
    const { theme } = useTheme() // useTheme is now declared
    const chartConfig = React.useMemo(() => {
      if (config.theme && config.theme[theme as keyof typeof config.theme]) {
        return {
          ...config,
          colors: config.theme[theme as keyof typeof config.theme],
        }
      }
      return config
    }, [config, theme])

    const chartColors = React.useMemo(() => {
      return Object.entries(chartConfig)
        .map(([key, value]) => {
          if (key === "theme") {
            return undefined
          }
          return `var(--color-${key})`
        })
        .filter(Boolean)
        .join(",")
    }, [chartConfig])

    return (
      <ChartContext.Provider value={{ config: chartConfig }}>
        <div
          data-chart={id}
          ref={ref}
          className={cn(
            'flex h-[400px] w-full flex-col [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-dot]:stroke-background [&_.recharts-legend-item_text]:fill-foreground [&_.recharts-tooltip-content]:rounded-md [&_.recharts-tooltip-label]:font-bold [&_.recharts-tooltip-label]:text-foreground [&_.recharts-tooltip-item_name]:text-muted-foreground [&_.recharts-tooltip-item_value]:text-foreground [&_[data-value="total"]]:hidden',
            className,
          )}
          style={
            {
              "--color-primary": `hsl(var(--primary))`,
              "--color-foreground": `hsl(var(--foreground))`,
              ...Object.fromEntries(
                Object.entries(chartConfig)
                  .filter(([key]) => key !== "theme")
                  .map(([key, value]) => [`--color-${key}`, value.color]),
              ),
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({
  cursor = false,
  content,
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
  content: React.ComponentType<any>
}) => {
  const { config } = useChart()
  const { theme } = useTheme()

  return (
    <RechartsPrimitive.Tooltip
      cursor={cursor}
      content={({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="p-2 min-w-[150px]">
              {" "}
              {/* Updated Card to div */}
              <div className="grid gap-1">
                {label && <div className="text-sm text-muted-foreground">{label}</div>}
                <div className="grid gap-1">
                  {payload.map((item: any) => {
                    const key = item.dataKey || item.name
                    const configItem = config[key]
                    return (
                      <div key={item.dataKey} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {configItem?.icon && (
                            <configItem.icon
                              className="h-3 w-3"
                              style={{
                                fill: configItem?.color || item.color,
                                stroke: configItem?.color || item.color,
                              }}
                            />
                          )}
                          <span className="text-muted-foreground">{configItem?.label || item.name}</span>
                        </div>
                        <span className="font-bold">{item.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }
        return null
      }}
      {...props}
    />
  )
}
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    nameKey?: string
    valueKey?: string
  }
>(({ className, hideLabel, hideIndicator, nameKey, valueKey, ...props }, ref) => (
  <div ref={ref} className={cn("grid text-xs leading-none", className)} {...props} />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = ({
  content,
  className,
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Legend> & {
  content?: React.ComponentType<any>
}) => {
  const { config } = useChart()
  return (
    <RechartsPrimitive.Legend
      content={({ payload }) => {
        if (content) {
          return React.createElement(content, { payload, config })
        }

        return (
          <div className={cn("flex items-center justify-center gap-4 h-9", className)}>
            {payload?.map((item: any) => {
              if (!item.value) return null

              const key = item.dataKey || item.value
              const configItem = config[key]

              return (
                <div key={key} className="flex items-center gap-1.5">
                  {configItem?.icon && (
                    <configItem.icon
                      className="h-3 w-3"
                      style={{
                        fill: configItem?.color || item.color,
                        stroke: configItem?.color || item.color,
                      }}
                    />
                  )}
                  <span className="text-muted-foreground">{configItem?.label || item.value}</span>
                </div>
              )
            })}
          </div>
        )
      }}
      {...props}
    />
  )
}
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    nameKey?: string
    valueKey?: string
  }
>(({ className, hideLabel, hideIndicator, nameKey, valueKey, ...props }, ref) => (
  <div ref={ref} className={cn("grid text-xs leading-none", className)} {...props} />
))
ChartLegendContent.displayName = "ChartLegendContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
