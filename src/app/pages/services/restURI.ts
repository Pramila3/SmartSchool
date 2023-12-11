let URI = {

    //Login
    'usersLogin': 'UserAuthentication/AuthenticateSSPUserAsync',

    //Create shift timing
    'getShiftTimingList': 'CreateShift/ShiftTimingList',
    'createShiftTiming': 'CreateShift/AddClassTimeTable',
    'updateShiftTiming': 'CreateShift/UpdateClassTimeTable',
    'findShiftTiming': 'CreateShift/GetTimeTableAccessbyid',
    'deleteShiftTiming': 'CreateShift/DeleteClassTimetable',

    'getShiftList': 'AllotShift/TimeTableAccess',
    'getClassDropDownList': 'AllotShift/BindClass',
    'shiftActiveStatus': 'AllotShift/SetActive',
    'getDayList': 'AllotShift/BindDays',
    'createShiftPreiod': 'AllotShift/InsertShiftDetails',
    'findShiftDetails': 'AllotShift/TimeTableAccessbyID',
    'deleteShiftDetails': 'AllotShift/DeleteShiftTiming',
    'getTimeTableDropDownList': 'ImportShiftTiming/GetTimeTableAccessbyid',
    'importShiftTiming': 'ImportShiftTiming/ImportShiftTiming',
    // allot subject
    'BindAllotSubject': 'AllotSubject/BindRoom',

    // // fix criteria
    'BindFixcriteriaList': 'FixCriteria/BindFixcriteriaList',
    'getclassList': 'FixCriteria/BindClassFixCriteria',
    'getSubjectList': 'FixCriteria/BindSubject',
    'getStaffList': 'FixCriteria/BindStaff',
    'getBindPeriodsData': 'FixCriteria/BindPeriodsFixCriteria',
    'ReservedPeriodsData': 'FixCriteria/SaveReservePeriods',
    'DeleteFixCriteriaList': 'FixCriteria/DeleteFixCriteria',

    //Combined class
    'combinedClassList': 'CombinedClass/CombinedClassList',
    'findDropdownList': 'CombinedClass/CombinedClassListbyId',
    'getCombinedShiftList': 'CombinedClass/BindShift',
    'getCombinedClasstList': 'CombinedClass/BindCombinedclasses',
    'getCombinedClassStafList': 'CombinedClass/BindCombinedClassstaff',
    'getBindperiodtable': 'CombinedClass/BindPeriodsCombinedClass',
    'SaveCombinedClass': 'CombinedClass/SaveCombinedClass',
    'DeleteCombinedclassList': 'CombinedClass/DeleteCombineClass',

    //Define class
    'getStaffDefinedList': 'DefinedClass/DefinedClassList',
    'getDefineClassDropDown': 'DefinedClass/BindDefinedClass',
    'getDefineSubjectDropDown': 'DefinedClass/BindDefinedSubject',
    'getDefineStaffDropDown': 'DefinedClass/BindDefinedClassstaff',
    'bindDefinedPeriods': 'DefinedClass/BindPeriodsDefinedClass',
    'DeleteStaffDefinedList': 'DefinedClass/DeleteDefinedClass',
    'saveDefinedClass': 'DefinedClass/SaveDefinedClass',
    'findDefinedClass': 'DefinedClass/GetDefinedetailsbyid',

    // process timetable
    'ProcessTimetableList':'ProcessTimetable/ProcessTimetableList',
    'ProcessTimetable': 'ProcessTimetable/ProcessTimetable',

    // replace staff
    'getBindStaffList':'ReplaceStaff/Bindstaffs',
    'getBindReplaceStaffStaffList':'ReplaceStaff/BindReplacestaff',
    'getBindGridList': 'ReplaceStaff/BindGrid',
    'ClickReplaceStaff':'ReplaceStaff/ReplaceStaff',

    // view module
    'ViewTimetableClasswise':'View/ViewTimetableClasswise',
    'ViewTimetableSubjectwise':'View/ViewTimetableSubwise',
    'ViewTimetableStaff':'View/ViewTimetableStaff',

    // manual adjustments 
    'BindNonFixedSubjects':'ManualAdjustment/BindNonFixedSubjects',
    'BindGridManualAdjustment':'ManualAdjustment/BindGridManualAdjustment',
    'SaveManualAdjustmentPeriods' : 'ManualAdjustment/SaveManualAdjustment',

    //Substitute Staff
    'substituteStaffList': 'StaffSubstitute/BindStaffSubstituteList',
    'substituteStaffDropDown': 'StaffSubstitute/Stafflookup',
    'getStaffSubstituteGrid': 'StaffSubstitute/BindGridStaffSubstitute',
    'getFreeStaffList': 'StaffSubstitute/BindFreeStaffList',
    'deleteStaffSubstitute': 'StaffSubstitute/DeleteStaffSubstitute',
    'getStaffSubstituteDetails': 'StaffSubstitute/Viewstafftimetable',
    'saveStaffSubstitute': 'StaffSubstitute/SaveStaffSubstitute'
}

export { URI }