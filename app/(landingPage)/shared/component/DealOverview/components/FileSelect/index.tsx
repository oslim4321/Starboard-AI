import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export function FileSelect() {
  const [value, setValue] = React.useState<string>("industrial");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-md px-4 py-2"
        aria-label="Select file"
      >
        <SelectValue placeholder="Select a file" />
        <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Files</SelectLabel>
          <SelectItem value="industrial">
            Industrial.Template.v2.4.xlsx
          </SelectItem>
          <SelectItem value="sales-report">Sales.Report.2025.Q1.pdf</SelectItem>
          <SelectItem value="user-data">User.Data.Export.csv</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
