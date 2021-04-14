using System;
using System.Collections.Generic;
using STDentalLibrary.Models.Report;

namespace STDentalLibrary.Repositories
{
    public interface IReportRepository
    {
        //задолженность на дату
        IEnumerable<DeptOfDate> GetDeptOfDate(DateTime dateReport);

        IEnumerable<DeptOfDate> GetDeptOfDate(int staffId, DateTime dateReport);

        IEnumerable<DeptOfDate> GetDeptOfDate(int staffId, DateTime dateReport, int patientId);

        IEnumerable<DeptOfDate> GetDeptOfDate(DateTime dateReport, int patientId);

        void DeptOfDateToExcell(IEnumerable<DeptOfDate> deptOfDates, DateTime dateReport);

        //количество пациентов по годам
        IEnumerable<PatientsGroupByYear> GetPatientsGroupByYear(DateTime startDate, DateTime endDate);

        void PatientsGroupByYearToExcell(IEnumerable<PatientsGroupByYear> patients, DateTime startDate, DateTime endDate);

        //использованные материалы за период
        IEnumerable<MaterialsUsedForPeriod> GetMaterialsUsedForPeriods(DateTime startDate, DateTime endDate);

        void MaterialsUsedForPeriodsToExcell(IEnumerable<MaterialsUsedForPeriod> materials, DateTime startDate, DateTime endDate);

        //оплата за период
        IEnumerable<PaymentForPeriod> GetPaymentForPeriods(DateTime startDate, DateTime endDate, Models.Enums.ReportDetalization detalization);

        IEnumerable<PaymentForPeriod> GetPaymentForPeriods(int staffId, DateTime startDate, DateTime endDate, Models.Enums.ReportDetalization detalization);

        IEnumerable<PaymentForPeriod> GetPaymentForPeriods(DateTime startDate, DateTime endDate, Models.Enums.ReportDetalization detalization, int patientId);

        TotalPaymentForPeriod GetTotalPaymentForPeriod(IEnumerable<PaymentForPeriod> paymentForPeriods);

        void PaymentToExcell(IEnumerable<PaymentForPeriod> payments);

        //талоны за период
        IEnumerable<PaymentForPeriod> GetTalonsForPeriods(DateTime startDate, DateTime endDate, Models.Enums.ReportDetalization detalization);

        IEnumerable<PaymentForPeriod> GetTalonsForPeriods(int staffId, DateTime startDate, DateTime endDate, Models.Enums.ReportDetalization detalization);

        IEnumerable<PaymentForPeriod> GetTalonsForPeriods(DateTime startDate, DateTime endDate, Models.Enums.ReportDetalization detalization, int patientId);

        TotalPaymentForPeriod GetTotalTalonsForPeriods(IEnumerable<PaymentForPeriod> paymentForPeriods);

        //остаток материалов
        IEnumerable<RemainderOfMaterials> GetRemainderOfMaterialses();

        void RemainderOfMaterialsesToExcell();
    }
}
