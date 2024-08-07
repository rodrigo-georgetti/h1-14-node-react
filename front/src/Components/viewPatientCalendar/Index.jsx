"use client"

import React, { useState, useMemo } from 'react';

import { Calendar } from "@/Components/ui/calendar"

import mascota from "../../assets/mascota.svg";
import rectangle_78 from "../../assets/rectangle_78.svg";

import {
    Square,
    SquarePen,
    SquareCheckBig,
    Clock,
    Trash2,
    PenLine,
    Search,
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Badge
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/Components/ui/dropdown-menu"

import { es } from "date-fns/locale";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

function ViewPatientCalendar() {

    //Calendar right side
    // const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [date, setDate] = React.useState(null);

    //calendar on the right
    const [date1, setDate1] = useState((new Date()));



    const events = [
        {
            event: "INV001",
            status: "Done",
            dateTime: "2024-07-19 02:50:00",
            eventType: "Medicacion",
        },
        {
            event: "INV002",
            status: "Pending",
            dateTime: "2024-07-19 01:50:00",
            eventType: "Actividad Fisica",
        },
        {
            event: "INV003",
            status: "Undone",
            dateTime: "2024-07-19 03:50:00",
            eventType: "Alimentacion",
        },
        {
            event: "INV004",
            status: "Done",
            dateTime: "2024-07-19 04:50:00",
            eventType: "Medicacion",
        },
        {
            event: "INV005",
            status: "Done",
            dateTime: "2024-07-19 05:50:00",
            eventType: "Actividad Fisica",
        },
        {
            event: "INV006",
            status: "Pending",
            dateTime: "2024-07-19 02:00:00",
            eventType: "Alimentacion",
        },
        {
            event: "INV007",
            status: "Undone",
            dateTime: "2024-07-19 03:00:00",
            eventType: "Medicacion",
        },
        {
            event: "INV008",
            status: "Pending",
            dateTime: "2024-07-19 02:00:00",
            eventType: "Medico general",
        },
        {
            event: "INV009",
            status: "Undone",
            dateTime: "2024-07-19 03:00:00",
            eventType: "Psicoterapia",
        },
        {
            event: "INV010",
            status: "Pending",
            dateTime: "2024-07-20 02:00:00",
            eventType: "Alimentacion",
        },
        {
            event: "INV011",
            status: "Undone",
            dateTime: "2024-07-20 03:00:00",
            eventType: "Medicacion",
        },        
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case "Done":
                return <SquareCheckBig />;
            case "Pending":
                return <Clock />;
            case "Undone":
                return <Square />;
            default:
                return "";
        }
    };


    const getBadgeClass = (eventType) => {
        switch (eventType) {
            case "Medicacion":
                return "bg-purple-500 text-white";
            case "Alimentacion":
                return "bg-yellow-500 text-white";
            case "Actividad Fisica":
                return "bg-yellow-500 text-white";
            case "Medico general":
                return "bg-green-400 text-white";
            case "Psicoterapia":
                return "bg-green-400 text-white";
            default:
                return "";
        }
    };


    // Extract unique event types
    // const uniqueEventTypes = [...new Set(events.map(event => event.eventType))];   //unsorted list
    const uniqueEventTypes = useMemo(() => [...new Set(events.map(event => event.eventType))].sort(), [events]);

    const doneCount = events.filter(event => event.status === "Done").length;
    const pendingCount = events.filter(event => event.status === "Pending").length;
    const undoneCount = events.filter(event => event.status === "Undone").length;
    const totalCount = events.length;

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState(uniqueEventTypes);

    const [searchKeyword, setSearchKeyword] = useState("");

    // const filteredEvents = useMemo(() => {
    //     let filtered = events;

    //     if (selectedCategories.length > 0) {
    //         filtered = filtered.filter(event => selectedCategories.includes(event.eventType));
    //     }

    //     if (searchKeyword) {
    //         filtered = filtered.filter(event => event.event.toLowerCase().includes(searchKeyword.toLowerCase()));
    //     }

    //     return filtered;
    // }, [events, selectedCategories, searchKeyword]);

    // const filteredEvents = useMemo(() => {
    //     if (selectedCategories.length === 0) {
    //         return events;
    //     }
    //     return events.filter(event => selectedCategories.includes(event.eventType));
    // }, [events, selectedCategories]);

    const filteredEvents = useMemo(() => {


            let filtered = events.filter(event =>
                (selectedCategories.length === 0 || selectedCategories.includes(event.eventType)) &&
                selectedTypes.includes(event.eventType) &&
                new Date(event.dateTime).toDateString() === date1.toDateString()
            );

            if (selectedCategories.length > 0) {
                filtered = filtered.filter(event => selectedCategories.includes(event.eventType));
            }

            if (searchKeyword) {
                filtered = filtered.filter(event => event.event.toLowerCase().includes(searchKeyword.toLowerCase()));
            }

        return filtered ;
    }, [events, selectedCategories, selectedTypes, date1, searchKeyword]);





    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const toggleType = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className='flex bg-white'>
            <div className='bg-secondary p-4'>
                <h4 className="text-3xl sm:text-2xl font-normal">Dia: {formatDate(date1)}</h4>
                <p>Esta es tu agenda de eventos del día.</p>
                <div className="flex pt-4 space-x-20 ">
                    <div className='relative w-full'>
                    <Input
                        type="text"
                        placeholder="Buscar en tabla"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="px-12 mb-4"
                    /> <span className='absolute bottom-4 left-4  py-2 '> <Search   /></span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="">Categoria</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Seleccione Categorias</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {uniqueEventTypes.map(type => (
                                <DropdownMenuCheckboxItem
                                    key={type}
                                    checked={selectedCategories.includes(type)}
                                    onCheckedChange={() => toggleCategory(type)}
                                >
                                    {type}
                                </DropdownMenuCheckboxItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={selectedCategories.length === 0}
                                onCheckedChange={() => setSelectedCategories([])}
                            >
                                Mostrar todas
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='rounded-lg border bg-white'>

                    <Table>

                        <TableHeader className="bg-pink-600">
                            <TableRow>
                                <TableHead className="w-auto text-white"><Square /></TableHead>
                                <TableHead className="w-auto text-white">Horario</TableHead>
                                <TableHead className="w-auto text-white" >Categoria</TableHead>
                                <TableHead className="w-auto text-white">Detalle</TableHead>
                                <TableHead className="w-auto text-white"></TableHead>
                                <TableHead className="w-auto text-white"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {/* {events.map((event) => ( */}
                            {filteredEvents.map((event) => (
                                <TableRow key={event.event}>
                                    <TableCell> {getStatusClass(event.status)}</TableCell>
                                    <TableCell className="">{event.dateTime}</TableCell>
                                    <TableCell><span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/20 ${getBadgeClass(event.eventType)}`}> {event.eventType} </span> </TableCell>

                                    <TableCell className="font-medium">{event.event}</TableCell>
                                    <TableCell><SquarePen stroke="#5666bf"/></TableCell>
                                    <TableCell><Trash2 stroke="#DA286D"/></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell colSpan={3}><Button variant="outline">Anterior</Button><Button variant="outline">Siguente</Button></TableCell>
                            </TableRow>
                        </TableFooter>
                        <TableCaption></TableCaption> */}
                    </Table>
                </div>

                <div className="p-4">
                    <span className='text-sm text-blue-500 text-left'> {`${doneCount}`} evento(s) de {`${totalCount}`} registrados.</span>
                    <Button variant="outline" className="float-right">Anterior</Button><Button variant="outline" className="float-right">Siguente</Button>
                </div>
            </div>
            <div className='max-w-min p-4'>

                <h4 className="text-3xl sm:text-2xl font-normal">Selecciona una fecha para ver los eventos del día.</h4>

                <div className='py-4'>
                    <Calendar
                        mode="single"
                        selected={date1}
                        onSelect={setDate1}
                        className=" w-fit rounded-md border"
                    />
                </div>
                <div >
                    <h4 className="text-3xl sm:text-2xl font-normal">Tipo de evento</h4>
                    <ul className='py-4'>
                        {uniqueEventTypes.map((type, index) => (
                            <li key={index} className="mb-2">
                                <Checkbox id={`eventType-${type}`}
                                    checked={selectedTypes.includes(type)}
                                    onCheckedChange={() => toggleType(type)}
                                    
                                />
                                <Label htmlFor={`eventType-${type}`} className="ml-2">{type}</Label>
                            </li>
                        ))}
                    </ul>

                </div>
                <div >
                    <div className='relative px-10'>
                        <img
                            src={rectangle_78}
                            className="w-full h-auto "
                            alt="rectangle_78"
                        />
                        <span className='absolute bottom-4 left-4 px-10 py-2 '>¡No te olvides de nada, agéndalo acá!</span>
                    </div>
                    <div className='flex items-baseline space-x-4'>
                        <img
                            src={mascota}
                            className=""
                            alt="mascota"
                        />
                        <Button className="rounded-3xl bg-inputPrimary space-x-4" type="submit">
                            <PenLine />  <span >Agregar evento</span>
                        </Button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ViewPatientCalendar;

