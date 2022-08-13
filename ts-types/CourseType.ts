export interface CourseType {
  _id?: string;
  id?: number;
  seqNo: number;
  url: string;
  iconUrl: string;
  courseListIcon?: string;
  description: string;
  longDescription?: string;
  category: string;
  lessonsCount?: number;
  promo?: boolean;
}

export const compareCourses = (c1: CourseType, c2: CourseType) => {
  const compare = c1.seqNo - c2.seqNo;
  if (compare > 0) return 0;
  else if (compare < 0) return -1;
  else return 0;
};
