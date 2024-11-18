import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";
import Card from "../\bcomponents/card";
import React from "react";

// 영화 목록을 가져오는 함수
const fetchMovies = async ({ pageParam = 1, category }) => {
  const encodedCategory = encodeURIComponent(category);
  const response = await axiosInstance.get(
    `/movie/${encodedCategory}?language=ko-KR&page=${pageParam}`
  );
  return response.data;
};

const Movies = () => {
  const { category } = useParams();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", category], // Query Key: 카테고리별 데이터를 캐싱
    queryFn: ({ pageParam = 1 }) => fetchMovies({ pageParam, category }), // Fetching 함수
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
    enabled: !!category, // category가 있을 때만 실행
    retry: 2, // 실패 시 재시도 횟수
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선함 유지
  });

  // 스크롤 감지하여 페이지 끝에 도달하면 fetchNextPage 호출
  const observerRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // 요소가 완전히 화면에 들어왔을 때만 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.results.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      ))}

      {/* 데이터가 끝나지 않았다면 감지용 div */}
      {hasNextPage && (
        <div
          ref={observerRef}
          style={{ height: "50px", backgroundColor: "transparent" }}
        />
      )}

      {/* 로딩 상태 표시 */}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2 style={{ color: "white" }}>로딩 중...</h2>
        </div>
      )}
    </Main>
  );
};

const Main = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  flex-wrap: wrap; /* 요소들이 한 줄에 다 안 들어가면 다음 줄로 넘김 */
  align-items: flex-start; /* 상단 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 10px; /* Card 요소 간 간격 */
  width: 100%; /* 전체 화면을 채움 */
  padding: 10px; /* 콘텐츠와 경계 간 간격 추가 */
`;

export default Movies;
