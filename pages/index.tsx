import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";

export default function Page() {
    return (
        
        <>
            
            <div className="xl:mx-96 md:mx-20 border-x border-slate-300 h-auto">
                <h1 className="text-3xl font-bold text-cyan-300 ml-2 mt-2">Hệ thống sắp xếp các từ rời rạc thành câu có nghĩa.</h1>
                <SearchInput />
            </div>
            
        </>
    )
  }