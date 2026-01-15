package org.dromara.${module}.service;

import org.dromara.common.mybatis.core.page.PageQuery;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.${module}.domain.dto.${Entity}Dto;
import org.dromara.${module}.domain.vo.${Entity}Vo;

import java.util.List;

/**
 * ${entityCn}服务接口
 *
 * @author ${author}
 * @since ${date}
 */
public interface I${Entity}Service {

    /**
     * 分页查询${entityCn}列表
     *
     * @param dto       查询条件
     * @param pageQuery 分页参数
     * @return 分页结果
     */
    TableDataInfo<${Entity}Vo> selectPageList(${Entity}Dto dto, PageQuery pageQuery);

    /**
     * 查询${entityCn}列表
     *
     * @param dto 查询条件
     * @return 列表
     */
    List<${Entity}Vo> selectList(${Entity}Dto dto);

    /**
     * 根据主键查询${entityCn}
     *
     * @param ${entityId} 主键
     * @return ${entityCn}
     */
    ${Entity}Vo selectById(${IdType} ${entityId});

    /**
     * 新增${entityCn}
     *
     * @param dto ${entityCn}信息
     * @return 结果
     */
    int insert(${Entity}Dto dto);

    /**
     * 修改${entityCn}
     *
     * @param dto ${entityCn}信息
     * @return 结果
     */
    int update(${Entity}Dto dto);

    /**
     * 批量删除${entityCn}
     *
     * @param ${entityId}s 需要删除的主键集合
     * @return 结果
     */
    int deleteByIds(List<${IdType}> ${entityId}s);
}
