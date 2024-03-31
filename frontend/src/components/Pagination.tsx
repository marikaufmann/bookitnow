export type PaginationType = {
  page: number;
  pages: number;
  onChangePage: (page: number) => void;
};
const Pagination = ({ page, pages, onChangePage }: PaginationType) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center">
      <ul className="flex gap-1 ">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => onChangePage(number)}
            className={`px-2 rounded-md py-1 border border-mutedbggray text-mutedtext ${
              page.toString() === number.toString()
                ? "bg-mutedbggray text-mutedtext font-bold"
                : ""
            }`}
          >
            <button>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
