import {
    Button,
    Col,
    DatePicker,
    Divider,
    Flex,
    Row,
    Space,
    Table,
    message,
  } from "antd";
  import { isEmpty } from "lodash";
  import React, { useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { HistoryOutlined } from "@ant-design/icons";
  
  function Implementation() {
    const location = useLocation();
    const data = location.state?.data;
    const [isClickable, setIsClickable] = useState(false);
    const [newAssessDetailData, setNewAssessDetailData] = useState(null);
    console.log("get planning", data);
  
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
        content: "Diagnosis saved successfully!",
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
      console.log("savedata", newAssessDetailData);
      if (!isEmpty(newAssessDetailData)) {
        // save to db
        success();
      }
  
      if (isEmpty(newAssessDetailData)) warning();
  
      setIsClickable(false);
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
                <div>IMPLEMENTATION</div>
                <div>RATIONALE</div>
              </div>
              {data?.diagnosis === 1 ? (
                <div className="grid grid-cols-3 text-2xl font-extrabold border overflow-y-scroll h-[650px]">
                  <div className="border p-2">
                    (1) Deficient Fluid Volume related to diarrhea as evidenced by dry mucous membranes, decreased skin turgor, and pale skin.
                  </div>
                  <div className="col-span-2">
                    <div className="text-center border font-bold text-xl p-2">INDEPENDENT</div>
                    <div className="grid grid-cols-2">
                        <div className="p-2 border">
                            <div>1. Encourage the use of oral rehydration solutions (ORS) that contain electrolytes such as Gatorade and smart water.</div>
                            <div>2. Recommend products such as natural fiber, plain natural yogurt, and Lactinex.</div>
                            <div>3. Limit caffeine and high fiber fruits.</div>
                            <div>4. Promote use of relaxation techniques such as progressive relaxation exercise, and visualization techniques.</div>
                        </div>
                        <div className="p-2 border">
                            <div>1. To replace lost fluids and salts (Doenges, M. et al., 2022).</div>
                            <div>2. According to Doenges (2022), To promote the restoration of normal intestinal flora and balance of glucose and electrolytes.</div>
                            <div>3. To prevent overstimulating the digestive tract and making diarrhea symptoms worse (Doenges, M. et al., 2022).</div>
                            <div>4. To alleviate the stress and anxiety of the client (Doenges, M. et al., 2022).</div>
                        </div>
                    </div>
                    <div className="text-center border font-bold text-xl p-2">DEPENDENT</div>
                    <div className="grid grid-cols-2">
                        <div className="p-2 border">
                            <div>1. Assess vital signs and symptoms of dehydration (e.g., skin turgor, mucous membranes) every 4 hours to detect early signs of fluid volume deficit.</div>
                            <div>2. Administer antidiarrheal medication, as indicated, to decrease gastrointestinal motility and minimize fluid losses.</div>
                            <div>3. Monitor total intake and output, including stool output as possible. Provide estimation of fluid needs.</div>
                            <div>4. Review results of laboratory testing.</div>
                            <div>5. Promote tepid sponge bath.</div>
                        </div>
                        <div className="p-2 border">
                            <div>1. To assess vital signs and symptoms of dehydration every 4 hours is essential for early detention, effective treatment, and risk management. To intervene promptly and prevent complications associated with fluid volume deficit (Cumpian, 2023).</div>
                            <div>2. To reduce fluid loss, minimize electrolyte loss, and to prevent complications (Vera, 2023).</div>
                            <div>3. To assist in maintaining optimal hydration status and prevent complications related to fluid imbalances (MedlinePlus, 2023).</div>
                            <div>4. To assess disease status, monitor treatment efficacy, detecting complications early, managing medications safely, assessing risk, providing follow-up care, and ensuring quality assurance in patient care (World Health Organization, 2023).</div>
                            <div>5. To justify the effectiveness in reducing fever, managing heat-related illnesses, providing comfort and hygiene, promoting skin health, offering pain relief, serving as an adjunct therapy, and non-invasive intervention (Hasan et al., 2021).</div>
                        </div>
                    </div>
                    <div className="text-center border font-bold text-xl p-2">COLLABORATIVE</div>
                    <div className="grid grid-cols-2">
                        <div className="p-2 border">
                            <div>1. Provide for changes in dietary intake to avoid foods or substances that precipitate diarrhea.</div>
                            <div>2. Restrict solid food intake, as indicated, to allow for bowel rest and reduced intestinal workload</div>
                            <div>3. Administer IV fluids, electrolytes, enteral and parenteral fluids, as indicated.</div>
                        </div>
                        <div className="p-2 border">
                            <div>1. To promote digestive health, prevent infection, and manage gastrointestinal conditions (Cleveland Clinic, 2021).</div>
                            <div>2. To further support the healing process while minimizing the risk of complications or exacerbating underlying gastrointestinal conditions (Tweed, 2023).</div>
                            <div>3. To revolve around correcting dehydration, restoring electrolyte balance, providing essential nutrients, supporting metabolic needs, managing critical illness, and facilitating medication administration (MedlinePlus, 2023). </div>
                        </div>
                    </div>
                  </div>
                </div>
              ) : data?.diagnosis === 2 ? (
                <div className="grid grid-cols-3 p-4 text-2xl font-extrabold border">
                  <div>
                    (2) Risk for Electrolyte Imbalance related to intense vomiting
                    and diarrhea leading to fluid and electrolyte loss.
                  </div>
                  <div>
                    <div>
                      After 1 week of nursing intervention the client will be able
                      to:
                    </div>
                    <div>
                      1. Maintain the serum sodium, calcium, potassium,
                      phosphorus, magnesium, and pH levels within the normal
                      range.
                    </div>
                    <div>
                      2. Reduce the episodes of diarrhea and vomiting to mitigate
                      fluid and electrolyte loss.
                    </div>
                    <div>
                      3. Implement a long-term nutritional plan to replenish lost
                      electrolytes and provide essential nutrients to support
                      overall health and recovery.
                    </div>
                  </div>
                  <div>
                    <div>
                      After 24 of nursing intervention the client will be able to:
                    </div>
                    <div>
                      1. Note if she is thirsty and less frequent or there is
                      absence of urination, dry mouth and skin, weakness,
                      light-headedness, and headaches.
                    </div>
                    <div>
                      2. Monitor the total intake and output that includes stool
                      output as possible and provides estimation of fluid needs.
                    </div>
                    <div>
                      3. Consume small amounts of food to minimize the risk of
                      excessive fluid and electrolyte loss.
                    </div>
                  </div>
                </div>
              ) : data?.diagnosis === 3 ? (
                <div className="grid grid-cols-3 p-4 text-2xl font-extrabold border">
                  <div>
                    (3) Acute Pain related to gastrointestinal inflammation as
                    evidenced by the patients self-report of abdominal cramps
                    rating 7/10 on the pain scale.
                  </div>
                  <div>
                    <div>
                      After one week of nursing intervention, the client will be
                      able to:
                    </div>
                    <div>
                      1. Attain complete resolution of abdominal pain through
                      consistent monitoring of pain relief interventions.
                    </div>
                    <div>
                      2. Incorporate recommended lifestyle changes and preventive
                      measures to reduce the likelihood of recurrent episodes.
                    </div>
                  </div>
                  <div>
                    <div>
                      After 24 hours of nursing intervention, the client will be
                      able to:
                    </div>
                    <div>
                      1. Experience a decrease in pain intensity from 7/10 to 3/10
                      through the appropriate administration of prescribed
                      medication
                    </div>
                    <div>
                      2. Independently perform pain assessments at regular
                      intervals of 1 to 2 hours.
                    </div>
                    <div>
                      3. Demonstrate an understanding of the underlying cause of
                      gastrointestinal inflammation.
                    </div>
                  </div>
                </div>
              ) : data?.diagnosis === 4 ? (
                <div className="grid grid-cols-3 p-4 text-2xl font-extrabold border">
                  <div>
                    (4) Risk for Imbalanced Nutrition less than body requirements
                    related to inadequate interest in food due to nausea,
                    vomiting, and diarrhea.
                  </div>
                  <div>
                    <div>
                      After two weeks of nursing intervention, the client will be
                      able to:
                    </div>
                    <div>
                      1. Maintain ideal nutritional status by consuming 100% of
                      their prescribed daily.
                    </div>
                    <div>
                      2. caloric intake and following dietary recommendations.
                    </div>
                    <div>
                      3. Demonstrate self-managing abilities in monitoring
                      nutritional intake.
                    </div>
                  </div>
                  <div>
                    <div>
                      After 48 hours of nursing intervention, the client will be
                      able to:
                    </div>
                    <div>
                      1. Experience a reduction in the severity of nausea,
                      vomiting, and diarrhea.
                    </div>
                    <div>
                      2. Show improved tolerance to small, frequent meals without
                      experiencing nausea, vomiting, and diarrhea.
                    </div>
                    <div>
                      3. Increase fluid intake to at least 2 liters per day to
                      avoid dehydration.
                    </div>
                  </div>
                </div>
              ) : data?.diagnosis === 5 ? (
                <div className="grid grid-cols-3 p-4 text-2xl font-extrabold border">
                  <div>
                    (5) Activity Intolerance related to fatigue and diarrhea as
                    evidenced by decreased activity level and reports of feeling
                    tired.
                  </div>
                  <div>
                    <div>
                      After two weeks of nursing intervention, the client will be
                      able to:
                    </div>
                    <div>
                      1. The client can demonstrate techniques and methods to
                      reduce the activity intolerance.
                    </div>
                    <div>
                      2. The client can participate in any activities that require
                      small movements.
                    </div>
                    <div>
                      3. The client can demonstrate how to breathe properly when
                      experiencing difficulty breathing.
                    </div>
                  </div>
                  <div>
                    <div>
                      After 24 hours of nursing intervention, the client will be
                      able to:
                    </div>
                    <div>
                      1. Have the knowledge about activity intolerance related to
                      fatigue and diarrhea and what therapy needs for prevention.
                    </div>
                    <div>
                      2. The patient’s cardiopulmonary condition will become
                      stable in terms of blood pressure and respiratory rate.
                    </div>
                    <div>
                      3. The patient will no longer experience respiratory
                      distress because of fatigue and diarrhea will no longer
                      experience.
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
  
            <div className="flex justify-between mt-5">
              <Link
                to="/planning"
                state={{ data: { ...newAssessDetailData, ...data } }}
                className="mt-2 bg-blue-500 p-2 text-white rounded-lg text-md"
              >
                Back to Planning {`(${data?.diagnosis})`}
              </Link>
              <Link
                to="/evaluation"
                state={{ data: { ...newAssessDetailData, ...data } }}
                className="mt-2 bg-blue-500 p-2 text-white rounded-lg text-md"
              >
                Proceed to Evaluation {`(${data?.diagnosis})`}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Implementation;
  