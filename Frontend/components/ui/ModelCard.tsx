import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Bot, ArrowRight } from "lucide-react"

interface ModelStats {
  parameters: string
  contextWindow: string
  trainingTokens: string
  latency: string
  accuracy?: string
}

interface ModelCardProps {
  name: string
  description: string
  version: string
  type: string
  stats: ModelStats
  tags: string[]
  status: string
  onDeploy: () => void
  onLearnMore: () => void
}

export function ModelCard({
  name,
  description,
  version,
  type,
  stats,
  tags,
  status,
  onDeploy,
  onLearnMore,
}: ModelCardProps) {
  return (
    <Card className="p-6 bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="rounded-lg bg-[#00cbdd]/10 p-3">
          {type === "LLM" ? <Brain className="h-6 w-6 text-[#00cbdd]" /> : <Bot className="h-6 w-6 text-[#00cbdd]" />}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">v{version}</p>
        </div>
        <div className="ml-auto">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "ready" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key}>
            <div className="text-xs text-muted-foreground mb-1">{key}</div>
            <div className="text-sm font-medium">{value}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 rounded-full bg-[#00cbdd]/10 text-[#00cbdd] text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <Button onClick={onDeploy} className="flex-1">
          Deploy
        </Button>
        <Button variant="outline" onClick={onLearnMore} className="flex gap-2">
          Learn More
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

