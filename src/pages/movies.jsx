import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";
import Card from "../\bcomponents/card";
import { useState } from "react";

// 영화 목록을 가져오는 함수
const fetchMovies = async ({ page, category }) => {
  const encodedCategory = encodeURIComponent(category);
  const response = await axiosInstance.get(
    `/movie/${encodedCategory}?language=ko-KR&page=${page}`
  );
  return response.data;
};

const Movies = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["movies", category, currentPage], // Query Key에 현재 페이지 포함
    queryFn: () => fetchMovies({ page: currentPage, category }), // Fetching 함수
    keepPreviousData: true, // 이전 페이지 데이터를 유지
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선함 유지
    retry: 2, // 실패 시 재시도 횟수
    enabled: !!category, // category가 있을 때만 실행
  });

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (data && currentPage < data.total_pages)
      setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩중 입니다 ...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생!</h1>
      </div>
    );
  }

  return (
    <Main>
      <CardGrid>
        {data?.results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </CardGrid>

      {/* 페이지네이션 버튼 */}
      <Pagination>
        <Button
          disabled={currentPage === 1} // 1페이지에서는 비활성화
          onClick={handlePrevPage}
        >
          이전
        </Button>
        <PageInfo>{currentPage} 페이지</PageInfo>
        <Button
          disabled={currentPage === data.total_pages} // 마지막 페이지에서 비활성화
          onClick={handleNextPage}
        >
          다음
        </Button>
      </Pagination>

      {/* 로딩 상태 표시 */}
      {isFetching && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2 style={{ color: "white" }}>로딩 중...</h2>
        </div>
      )}
    </Main>
  );
};

const Main = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #ff004f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export default Movies;
