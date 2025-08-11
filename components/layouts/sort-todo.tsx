import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, PlusCircle, SortAsc, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { SortingState } from "@tanstack/react-table";

type SortTodoProps = {
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
};

export default function SortTodo({ sorting, setSorting }: SortTodoProps) {
    const [rules, setRules] = useState<{ id: string; desc: boolean }[]>([{ id: "", desc: false }]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setRules(sorting.length > 0 ? sorting : [{ id: "", desc: false }]);
        }
    }, [open, sorting]);

    const updateRule = (index: number, key: string, value: string) => {
        const newRules = [...rules];
        if (key === "id") {
            newRules[index].id = value;
        } else if (key === "desc") {
            newRules[index].desc = value === "desc";
        }
        setRules(newRules);
    };

    const addRule = () => {
        setRules([...rules, { id: "", desc: false }]);
    };

    const applySorting = () => {
        const filteredRules = rules.filter(r => r.id);
        setSorting(filteredRules);
        setOpen(false);
    };

    const resetSorting = () => {
        setRules([{ id: "", desc: false }]);
        setSorting([]);
        setOpen(false);
    };

    const cancelSorting = () => {
        setRules(sorting.length > 0 ? sorting : [{ id: "", desc: false }]);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-fit">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <SortAsc className="w-4 h-4" /> Sort
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end">
                <div className="flex items-center gap-4">
                    {rules.map((rule, index) => (
                        <div key={index} className="flex gap-2">
                            <Select
                                value={rule.id}
                                onValueChange={(val) => updateRule(index, "id", val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Column" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Task</SelectItem>
                                    <SelectItem value="status">Status</SelectItem>
                                    <SelectItem value="serialNumber">Serial No</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={rule.desc ? "desc" : "asc"}
                                onValueChange={(val) => updateRule(index, "desc", val)}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Order" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">Asc</SelectItem>
                                    <SelectItem value="desc">Desc</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addRule}
                        className="w-full flex items-center gap-1"
                    >
                        <PlusCircle className="w-4 h-4" /> Add Sorting Rule
                    </Button>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 flex justify-between">
                    <Button
                        variant="destructive" // red for "danger" action
                        size="sm"
                        onClick={resetSorting}
                        className="flex items-center gap-1"
                    >
                        Reset
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="flex gap-2">
                        <Button
                            variant="secondary" // grayish for neutral action
                            size="sm"
                            onClick={cancelSorting}
                            className="flex items-center gap-1"
                        >
                            <CircleX className="w-4 h-4" />
                            Cancel
                        </Button>

                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1" // success action
                            size="sm"
                            onClick={applySorting}
                        >
                            Apply
                            <CircleCheck className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

            </PopoverContent>
        </Popover>
    );
}
