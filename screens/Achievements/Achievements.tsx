import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, Dimensions, View } from "react-native";
import { PageContainer, PageHeader, TextBasic } from "../../components";
import { Calendar } from "./Calendar";
import DaysHeader from "./Calendar/DaysHeader";

const Achievements = () => {
  return (
    <PageContainer>
      <PageHeader title={`achievements`} back />
      <DaysHeader />
      <Calendar />
    </PageContainer>
  );
};

export default Achievements;
