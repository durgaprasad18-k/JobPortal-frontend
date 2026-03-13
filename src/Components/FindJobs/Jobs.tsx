import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobList as data } from "../../Data/JobsData";
import { resetFilter } from "../../Slices/FilterSlice";
import JobCard from "./JobCard";
import Sort from "./Sort";

const Jobs = () => {

  const dispatch = useDispatch();

  const [jobList, setJobList] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);

  const sort = useSelector((state: any) => state.sort);
  const filter = useSelector((state: any) => state.filter);

  // Load jobs data
  useEffect(() => {
    setJobList(data);
  }, []);

  // Sorting logic
  useEffect(() => {

    if (sort === "Most Recent") {
      setJobList([...jobList].sort((a: any, b: any) =>
        b.postedDaysAgo - a.postedDaysAgo
      ));
    }

    else if (sort === "Salary: Low to High") {
      setJobList([...jobList].sort((a: any, b: any) =>
        a.packageOffered - b.packageOffered
      ));
    }

    else if (sort === "Salary: High to Low") {
      setJobList([...jobList].sort((a: any, b: any) =>
        b.packageOffered - a.packageOffered
      ));
    }

  }, [sort]);

  // Filtering logic
  useEffect(() => {

    let filtered = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtered = filtered.filter((job: any) =>
        filter["Job Title"].some((x: any) =>
          job.jobTitle?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      filtered = filtered.filter((job: any) =>
        filter.Location.some((x: any) =>
          job.location?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }

    if (filter.Experience && filter.Experience.length > 0) {
      filtered = filtered.filter((job: any) =>
        filter.Experience.some((x: any) =>
          job.experience?.toLowerCase() === x.toLowerCase()
        )
      );
    }

    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filtered = filtered.filter((job: any) =>
        filter["Job Type"].some((x: any) =>
          job.jobType?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }

    if (filter.salary && filter.salary.length > 0) {
      filtered = filtered.filter((job: any) =>
        filter.salary[0] <= job.packageOffered &&
        job.packageOffered <= filter.salary[1]
      );
    }

    setFilteredJobs(filtered);

  }, [filter, jobList]);

  return (
    <div className="px-5 py-5">

      <div className="flex justify-between flex-wrap mt-5">

        <div className="text-2xl xs-mx:text-xl flex gap-3 items-center font-semibold">
          Recommended jobs

          {Object.keys(filter).length > 0 && (
            <Button
              onClick={() => dispatch(resetFilter())}
              className="font-body transition duration-300"
              size="compact-sm"
              leftSection={<IconX stroke={1.5} size={20} />}
              variant="filled"
              color="brightSun.4"
              autoContrast
            >
              Clear Filters
            </Button>
          )}

        </div>

        <Sort sort="job" />

      </div>

      <div className="flex mt-10 flex-wrap gap-5">

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job: any, index: number) => (
            <JobCard key={index} {...job} />
          ))
        ) : (
          <div className="font-medium text-lg">
            No job found
          </div>
        )}

      </div>

    </div>
  );
};

export default Jobs;