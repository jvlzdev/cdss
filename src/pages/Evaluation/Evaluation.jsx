import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Radio,
  Row,
  Space,
  Table,
  message,
} from "antd";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HistoryOutlined } from "@ant-design/icons";

function Evaluation() {
  const location = useLocation();
  const data = location.state?.data;
  const [isClickable, setIsClickable] = useState(false);
  const [newAssessDetailData, setNewAssessDetailData] = useState(null);
  const [newEvaluationData, setNewEvaluationData] = useState(null);
  const [isSave, setIsSave] = useState(false);
  console.log("get evaluation", data);

  const [messageApi, contextHolder] = message.useMessage();

  const [newAssessmentData, setNewAssessmentData] = useState(null);

  const handleAddRow = () => {
    const newRow = {
      key: (newAssessmentData.length + 1).toString(),
      date: "",
      foodBeverage: "",
    };
    setNewAssessmentData([...newAssessmentData, newRow]);
  };

  const columns = [
    {
      title: "Date",
      key: "date",
      width: "20%",
      render: (record) => {
        return (
          <>
            <DatePicker
              required
              showTime
              // onChange={onChangeDatePicker}
              className="rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1 w-full"
            />
          </>
        );
      },
    },
    {
      title: "Food and Beverage intake",
      key: "foodBeverage",
      render: (record) => {
        return (
          <>
            <textarea
              type="text"
              // onChange={(e) => setFirstName(e.target.value)}
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1 h-32"
              disabled={!isClickable}
              style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setNewPatientData((pre) => {
                  return { ...pre, medHistory: e.target.value };
                });
              }}
            />
          </>
        );
      },
    },
  ];

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Evaluation saved successfully!",
    });
  };

  const warning = (props) => {
    messageApi.open({
      type: "warning",
      content: `${!isEmpty(props) ? props : "Please input data"}`,
    });
  };

  const getSideData = () => {
    return (
      <div>
        <div>
          <img src="https://fakeimg.pl/240x150?text=Image" />
        </div>
        <div className="font-bold text-xl my-3">{`${data?.firstName} ${data?.lastName}`}</div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Gender</div>
          <div className="font-bold">{data?.gender}</div>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Age</div>
          <div className="font-bold">{data?.age}</div>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Height</div>
          <div className="font-bold">{data?.height} /cm</div>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="text-sm text-gray-700">Weight</div>
          <div className="font-bold">{data?.weight} /kg</div>
        </div>
      </div>
    );
  };

  const getMainData = () => {
    return (
      <>
        {contextHolder}
        <div className="grid grid-cols-4 mb-10">
          <div>
            <div className="text-gray-700 text-sm">Last Name</div>
            <div className="font-bold">{data?.lastName}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">First Name</div>
            <div className="font-bold">{data?.firstName}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Birth Date</div>
            <div className="font-bold">{data?.birthday}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 mb-10">
          <div>
            <div className="text-gray-700 text-sm">Address</div>
            <div className="font-bold">{data?.homeAddress}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Phone</div>
            <div className="font-bold">{data?.phoneNumber}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Email</div>
            <div className="font-bold">{data?.email}</div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div>
            <div className="text-gray-700 text-sm">Nationality</div>
            <div className="font-bold">{data?.nationality}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Marital Status</div>
            <div className="font-bold">{data?.maritalStatus}</div>
          </div>
          <div>
            <div className="text-gray-700 text-sm">Religion</div>
            <div className="font-bold">{data?.religion}</div>
          </div>
        </div>
      </>
    );
  };

  const onClickEditDetails = () => {
    setIsClickable(!isClickable);
  };

  const onClickSaveDetails = () => {
    console.log("newEvaluationData", newEvaluationData);
    if (!isEmpty(newEvaluationData)) {
      // save to db
      setIsSave(true);
      success();
    }

    if (isEmpty(newEvaluationData)) warning();

    setIsClickable(false);
  };

  const onChangeRadio = (e) => {
    setNewEvaluationData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      {contextHolder}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit">
            {getSideData()}
          </div>
          {/* <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit mt-4">
                {getOutPatients()}
              </div> */}
        </div>
        <div className="rounded-lg bg-white p-4 col-span-10 shadow-md h-auto">
          <div className="col-span-12">
            <div className="grid grid-cols-3 bg-gray-600 text-center text-white p-4 text-2xl font-extrabold">
              <div>DIAGNOSIS</div>
              <div className="col-span-2">MET OR UNMET</div>
            </div>
            {data?.diagnosis === 1 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[600px]">
                <div className="border p-2">
                  (1) Deficient Fluid Volume related to diarrhea as evidenced by
                  dry mucous membranes, decreased skin turgor, and pale skin.
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The interventions were effective because the client is
                        starting to use oral rehydration solutions (ORS). It’s
                        appropriate since the client has lost fluids and salts
                        that trigger diarrhea. Adequacy is evident in its
                        ability to address hydration factors that contribute to
                        diarrhea effectively. Feedback from the client indicates
                        high acceptability, with her expressing satisfaction.
                      </div>
                      <div>
                        <Radio.Group name="met1" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The client shows interest in taking these products:
                        natural fiber, plain natural yogurt, and Lactinex. This
                        indicates how effective the intervention is. Adequacy is
                        apparent in its ability to address the need to in take
                        such products mentioned. The client demonstrated
                        acceptability by taking these recommended products to
                        balance out the sugar in her stomach. The nursing
                        intervention demonstrated efficiency by recommending
                        healthy products to reduce the risk of diarrhea.
                      </div>
                      <div>
                        <Radio.Group name="met2" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The nursing intervention was effective because after
                        three days the client limited her intake of caffeine and
                        high fiber fruits. Adequacy is evident because the
                        client addresses the need for limiting the intake of
                        caffeine and high fiber fruits. Patient expressed
                        acceptability by showing satisfaction. In addition,
                        appropriateness is evident by its alignment with the
                        needs of the patient’s dietary needs.
                      </div>
                      <div>
                        <Radio.Group name="met3" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The client has reported following the techniques that’s
                        recommended to her. The intervention was efficient since
                        it alleviated the stress and anxiety of the client.
                        Adequacy is apparent through the client expressing her
                        opinion on these techniques. The client shows
                        acceptability by recognizing the proper relaxation
                        exercise, and visualization techniques.
                      </div>
                      <div>
                        <Radio.Group name="met4" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The interventions were effective because the client is
                        starting to use oral rehydration solutions (ORS). It’s
                        appropriate since the client has lost fluids and salts
                        that trigger diarrhea. Adequacy is evident in its
                        ability to address hydration factors that contribute to
                        diarrhea effectively. Feedback from the client indicates
                        high acceptability, with her expressing satisfaction.
                      </div>
                      <div>
                        <Radio.Group name="met5" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The interventions were effective because the client is
                        starting to use oral rehydration solutions (ORS). It’s
                        appropriate since the client has lost fluids and salts
                        that trigger diarrhea. Adequacy is evident in its
                        ability to address hydration factors that contribute to
                        diarrhea effectively. Feedback from the client indicates
                        high acceptability, with her expressing satisfaction.
                      </div>
                      <div>
                        <Radio.Group name="met6" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The client shows interest in taking these products:
                        natural fiber, plain natural yogurt, and Lactinex. This
                        indicates how effective the intervention is. Adequacy is
                        apparent in its ability to address the need to in take
                        such products mentioned. The client demonstrated
                        acceptability by taking these recommended products to
                        balance out the sugar in her stomach. The nursing
                        intervention demonstrated efficiency by recommending
                        healthy products to reduce the risk of diarrhea.
                      </div>
                      <div>
                        <Radio.Group name="met7" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The nursing intervention was effective because after
                        three days the client limited her intake of caffeine and
                        high fiber fruits. Adequacy is evident because the
                        client addresses the need for limiting the intake of
                        caffeine and high fiber fruits. Patient expressed
                        acceptability by showing satisfaction. In addition,
                        appropriateness is evident by its alignment with the
                        needs of the patient’s dietary needs.
                      </div>
                      <div>
                        <Radio.Group name="met8" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The client has reported following the techniques that’s
                        recommended to her. The intervention was efficient since
                        it alleviated the stress and anxiety of the client.
                        Adequacy is apparent through the client expressing her
                        opinion on these techniques. The client shows
                        acceptability by recognizing the proper relaxation
                        exercise, and visualization techniques.
                      </div>
                      <div>
                        <Radio.Group name="met9" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The interventions were effective because the client is
                        starting to use oral rehydration solutions (ORS). It’s
                        appropriate since the client has lost fluids and salts
                        that trigger diarrhea. Adequacy is evident in its
                        ability to address hydration factors that contribute to
                        diarrhea effectively. Feedback from the client indicates
                        high acceptability, with her expressing satisfaction.
                      </div>
                      <div>
                        <Radio.Group name="met10" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The interventions were effective because the client is
                        starting to use oral rehydration solutions (ORS). It’s
                        appropriate since the client has lost fluids and salts
                        that trigger diarrhea. Adequacy is evident in its
                        ability to address hydration factors that contribute to
                        diarrhea effectively. Feedback from the client indicates
                        high acceptability, with her expressing satisfaction.
                      </div>
                      <div>
                        <Radio.Group name="met11" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The client shows interest in taking these products:
                        natural fiber, plain natural yogurt, and Lactinex. This
                        indicates how effective the intervention is. Adequacy is
                        apparent in its ability to address the need to in take
                        such products mentioned. The client demonstrated
                        acceptability by taking these recommended products to
                        balance out the sugar in her stomach. The nursing
                        intervention demonstrated efficiency by recommending
                        healthy products to reduce the risk of diarrhea.
                      </div>
                      <div>
                        <Radio.Group name="met12" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 2 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[600px]">
                <div className="border p-2">
                  (2) Risk for Electrolyte Imbalance related to intense vomiting
                  and diarrhea leading to fluid and electrolyte loss.
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The intervention was proven effective by the client’s
                        willingness to cooperate with Oral Rehydration Therapy
                        (ORT). It demonstrated efficiency by providing patient
                        needs of therapy. Adequacy in the intervention is
                        apparent in addressing ORT to rehydrate the client.
                        Client shows acceptability to the intervention by
                        cooperating and acknowledging the therapy.
                      </div>
                      <div>
                        <Radio.Group name="met1" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The intervention to monitor vital signs and symptoms of
                        shock or worsening dehydration has proven effective in
                        detecting early signs of fluid volume deficit. By
                        concentrating on reliable indicators, healthcare workers
                        can effectively and promptly identify the symptoms of
                        dehydration. The efficacy of the intervention is
                        demonstrated by its capacity to identify early
                        indicators, which meets the requirement of prompt
                        intervention to avert consequences. The patient
                        demonstrates acceptability by acknowledging the value of
                        the structured approach in raising the standard of their
                        care. The appropriateness of the Intervention is in line
                        with best practices.
                      </div>
                      <div>
                        <Radio.Group name="met2" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The evaluation indicates the nursing intervention
                        effectively measures and documents all the intake and
                        output of the patient. Adequacy is evident because it
                        addresses the monitoring needs of the patient.
                      </div>
                      <div>
                        <Radio.Group name="met3" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The intervention to assess skin turgor, mucous
                        membranes, and capillary refill is confirmed effective
                        by detecting dehydration among adults. It is adequate
                        because it addresses the need for information about
                        hydration status. The patient exhibits acceptability by
                        cooperating during the assessment.
                      </div>
                      <div>
                        <Radio.Group name="met4" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The evaluation proves the effectiveness of the
                        intervention in addressing dehydration and electrolyte
                        imbalances, as well as ensuring appropriate treatment.
                        It also demonstrates the collaboration with physicians
                        to initiate IV fluid therapy if oral rehydration is not
                        successful or tolerated. The relationship functions
                        effectively, enabling prompt interventions for patients
                        who cannot handle oral intake. The intervention
                        demonstrates adequacy when it fully attends to the
                        requirement for comprehensive management. Feedback
                        suggests that this method encourages patient
                        participation in the treatment process and is
                        well-received by clients and healthcare professionals
                        alike. Additionally, the interventions compliance with
                        acceptable medical standards highlights how suitable it
                        is to treat dehydration and electrolyte imbalances with
                        IV fluid treatment in conjunction with doctors when oral
                        rehydration is unsatisfactory or ineffective.
                      </div>
                      <div>
                        <Radio.Group name="met5" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        The evaluation demonstrates that the intervention was
                        successful on several levels. First, it works well with
                        healthcare providers to obtain necessary laboratory
                        tests, such as creatinine, blood urea nitrogen (BUN),
                        and electrolytes (sodium, potassium, chloride, and
                        bicarbonate), which ensures accurate assessment of
                        hydration status and electrolyte balance. The
                        collaboration functions effectively, enabling prompt
                        interventions when required. The intervention
                        demonstrates adequacy when it fully attends to the need
                        for in-depth evaluation. Feedback suggests that the
                        strategy is well-received by patients and healthcare
                        professionals, encouraging participation in the
                        evaluation procedure. Furthermore, the interventions
                        appropriateness in meeting hydration and electrolyte
                        balance needs through laboratory testing together with
                        physicians is highlighted by its conformance to accepted
                        medical norms and guidelines.
                      </div>
                      <div>
                        <Radio.Group name="met6" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The evaluation demonstrates that the intervention was successful on several levels. First, it works well with healthcare providers to obtain necessary laboratory tests, such as creatinine, blood urea nitrogen (BUN), and electrolytes (sodium, potassium, chloride, and bicarbonate), which ensures accurate assessment of hydration status and electrolyte balance. The collaboration functions effectively, enabling prompt interventions when required. The intervention demonstrates adequacy when it fully attends to the need for in-depth evaluation. Feedback suggests that the strategy is well-received by patients and healthcare professionals, encouraging participation in the evaluation procedure. Furthermore, the intervention's appropriateness in meeting hydration and electrolyte balance needs through laboratory testing together with physicians is highlighted by its conformance to accepted medical norms and guidelines.`}
                      </div>
                      <div>
                        <Radio.Group name="met10" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 3 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[600px]">
                <div className="border p-2">
                  (3){" "}
                  {`Acute Pain related to gastrointestinal inflammation as evidenced by the patient's self-report of abdominal cramps rating 7/10 on the pain scale, distress, and discomfort. `}
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`Consistently assessing pain location, intensity, duration, quality, and aggravating/relieving factors, providing a view of the patient’s pain. Integrating patients' perspectives and experiences makes the assessment process more accurate. Developing specific interventions based on the location, intensity, duration, and quality factors identification of patient pain triggers.`}
                      </div>
                      <div>
                        <Radio.Group name="met1" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The evaluation incorporates regular monitoring of vital signs, including blood pressure, heart rate, and respiratory rate, to physiological responses to pain. Consistently tracking crucial signs before and after pain intervention and accurate documentation allows the identification of patterns in vital signs if they are increasing or decreasing from expected findings. `}
                      </div>
                      <div>
                        <Radio.Group name="met2" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The implementation of relaxation techniques for pain relief and anxiety reduction provides non-pharmacological options for pain relief and promotes self-efficacy. Regular assessment of effectiveness ensures personalized pain management and anxiety reduction strategies.`}
                      </div>
                      <div>
                        <Radio.Group name="met3" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`Administering prescribed pain medication has been effectively implemented, improving pain management. The pain in the abdominal area disappeared after the client drank the medicine prescribed by the doctor. Constant monitoring is necessary to ensure continuous improvement of pain relief and anticipate any adverse effects of medication. `}
                      </div>
                      <div>
                        <Radio.Group name="met6" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`Collaboration with a dietician to develop a personalized dietary plan addressing food triggers, such as lactose intolerance and gluten sensitivity, has effectively promoted patient-centered care. `}
                      </div>
                      <div>
                        <Radio.Group name="met10" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 4 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[600px]">
                <div className="border p-2">
                  (4){" "}
                  {`Risk for Imbalanced Nutrition: Less Than Body Requirements related to nausea, vomiting, and diarrhea as evidenced by decreased oral intake.`}
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The intervention to assess current weight compared to usual weight and norms for age, gender, and body size was effective because it promotes health and well-veing across various life stages. Adequacy was demonstrated by addressing the needs of the patient to be assessed. The client shows acceptability through cooperating and acknowledging the assessments.`}
                      </div>
                      <div>
                        <Radio.Group name="met1" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`Auscultating the presence and character of bowel sounds was effective by evaluating the gastrointestinal function, detecting abnormalities, diagnosing gastrointestinal disorders, and ensuring proper digestion and absorption of nutrients. It’s adequate because it conveys the patient’s ability and readiness of the intestinal tract to handle digestive processes. Acceptability was evident due to the patient's willingness to be assessed. `}
                      </div>
                      <div>
                        <Radio.Group name="met2" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`Administering pharmaceutical agents, as indicated: vitamin and mineral (iron) supplements, digestive drugs or enzymes and medications is effective in addressing specific health issues, managing symptoms, preventing complications, and promoting overall well-being based on individual patient needs and clinical indications. It has demonstrated adequacy due to the ability to address a patient's risk for imbalanced nutrition. Patient satisfaction is evidence that the intervention is acceptable.`}
                      </div>
                      <div>
                        <Radio.Group name="met5" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The evaluation confirms the successful intervention by effectively collaborating with an interdisciplinary team to set nutritional goals. Adequacy is evident as the intervention comprehensively addresses the requirement for thorough evaluation. The alignment with established medical standards and guidelines underscores the appropriateness of the intervention in addressing hydration and electrolyte balance requirements through laboratory testing collaboration with  interdisciplinary teams. The patient shows acceptability by giving feedback to the intervention given.`}
                      </div>
                      <div>
                        <Radio.Group name="met10" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data?.diagnosis === 5 ? (
              <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[600px]">
                <div className="border p-2">
                  (5){" "}
                  {`Activity Intolerance related to fatigue and diarrhea as evidenced by decreased activity level and reports of feeling tired. `}
                </div>
                <div className="col-span-2">
                  <div className="text-center border font-bold text-xl p-2">
                    INDEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The intervention that has been given to the client was proven effective because it optimizes training outcomes and ensures overall well-being during exercise. It has demonstrated efficacy by providing the patient with realistic and useful advice. The intervention's adequacy in addressing the dietary components that contribute to diarrhea and fatigue is apparent. Acceptability is apparent through the patient’s acknowledging the assessments and results.`}
                      </div>
                      <div>
                        <Radio.Group name="met1" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`This evaluation has proven effective by capturing key aspects of a client's well-being, including physical sensations and challenges in daily functioning. It's important for assessing their overall health and designing appropriate interventions.`}
                      </div>
                      <div>
                        <Radio.Group name="met2" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    DEPENDENT
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The intervention to provide and monitor response to supplemental oxygen, medications, and changes in treatment regimen demonstrated effectiveness by the client showing improved oxygen saturation levels and symptom relief. Adequacy was evident in addressing the client's specific needs and condition. Acceptability wad apparent due to the patient’s tolerability and willingness to comply with the regimen.`}
                      </div>
                      <div>
                        <Radio.Group name="met5" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border font-bold text-xl p-2">
                    COLLABORATIVE
                  </div>
                  <div>
                    <div className="p-2 border">
                      <div className="p-2">
                        {`The evaluation confirms the effectiveness of the intervention on determining the client’s current activity level and physical condition with observation, exercise-capacity testing, or use of a functional-level classification system.. This collaboration operates efficiently, facilitating timely interventions as needed. Adequacy is demonstrated as the intervention comprehensively addresses the needs of the  aseline assessment, risk stratification, exercise prescription, progress monitoring, safety promotion, and delivering patient-centered care to patient's needs and goals. It is acceptable because of the client's satisfaction with the intervention provided.`}
                      </div>
                      <div>
                        <Radio.Group name="met10" onChange={onChangeRadio}>
                          <Radio value={"MET"}>MET</Radio>
                          <Radio value={"UNMET"}>UNMET</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="mt-5">
            <div className="text-xl">Flow Chart (CDSS)</div>
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
                href={`${
                  data?.diagnosis === 1
                    ? "https://drive.google.com/file/d/1KFTwxbt2KLZ-i7nD_EnU64yifbRa5Wez/view?usp=drive_link"
                    : data?.diagnosis === 2
                    ? "https://drive.google.com/file/d/1wrYjLp-_5PnRqyEqngbuFRjtnoeal0jf/view?usp=drive_link"
                    : data?.diagnosis === 3
                    ? "https://drive.google.com/file/d/1gEyV-n41Ut91Ae6lN34_BVijl2z4bV8H/view?usp=drive_link"
                    : data?.diagnosis === 4
                    ? "https://drive.google.com/file/d/1N0cFZwJL04Cq1AfZPK4p63alDarNDyPu/view?usp=drive_link"
                    : data?.diagnosis === 5
                    ? "https://drive.google.com/file/d/1wDusC-7mhVKTaNlrnaEAebKZHiMyT2zU/view?usp=drive_link"
                    : ""
                }`}
              >
                {`${
                  data?.diagnosis === 1
                    ? "https://drive.google.com/file/d/1KFTwxbt2KLZ-i7nD_EnU64yifbRa5Wez/view?usp=drive_link"
                    : data?.diagnosis === 2
                    ? "https://drive.google.com/file/d/1wrYjLp-_5PnRqyEqngbuFRjtnoeal0jf/view?usp=drive_link"
                    : data?.diagnosis === 3
                    ? "https://drive.google.com/file/d/1gEyV-n41Ut91Ae6lN34_BVijl2z4bV8H/view?usp=drive_link"
                    : data?.diagnosis === 4
                    ? "https://drive.google.com/file/d/1N0cFZwJL04Cq1AfZPK4p63alDarNDyPu/view?usp=drive_link"
                    : data?.diagnosis === 5
                    ? "https://drive.google.com/file/d/1wDusC-7mhVKTaNlrnaEAebKZHiMyT2zU/view?usp=drive_link"
                    : ""
                }`}
              </a>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <Link
              to="/implementation"
              state={{ data: { ...newAssessDetailData, ...data } }}
              className="mt-2 bg-blue-500 p-2 text-white rounded-lg text-md"
            >
              Back to Implementation {`(${data?.diagnosis})`}
            </Link>
            {!isEmpty(newEvaluationData) && (
              <Button
                onClick={onClickSaveDetails}
                className="bg-green-500 text-white rounded-lg text-md text-center items-center"
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evaluation;
