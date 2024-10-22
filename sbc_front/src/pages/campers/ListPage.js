import {useSearchParams} from "react-router-dom";
import ListComponent from "../../components/campers/ListComponent";

const ListPage = () => {
    const [queryParams] = useSearchParams()
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                cBoardId List Page Component {page} --- {size}
            </div>
            <ListComponent/>
        </div>
    );
}
export default ListPage