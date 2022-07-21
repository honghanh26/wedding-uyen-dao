import TableCard from '../components/TableCard';

export default function Banners() {
    return (
        <>
            <div className="p-3 md:p-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <TableCard />
                    </div>
                </div>
            </div>
        </>
    );
}
